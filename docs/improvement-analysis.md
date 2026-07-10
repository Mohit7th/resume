# Resume Website — Improvement, Issues & Performance Analysis

_Reviewed: 2026-07-10 · Branch: `develop` · Stack: React 19 + TypeScript + Vite + MUI 9_

This report reviews the current state of the resume site and lists concrete
improvement areas grouped by priority. It complements the existing
`resume-modernization-proposal.md` (which is about visual direction) by focusing
on **correctness, dead code, performance, SEO/a11y, and UX**.

---

## 0. Executive Summary

The public-facing home page is in good shape — clean MUI theme, semantic
sections, accessibility basics (skip link, aria labels, `prefers-reduced-motion`),
SEO metadata, JSON-LD, and a `<noscript>` fallback. Good work.

The main problems are:

1. **Deployment config points at the wrong repo/URL** (`mohit7th/resume` vs the
   actual `mohit-uniyal-dev/reume`). The site will deploy to the wrong base path.
2. **The admin panel is non-functional** — login does nothing, "Add"/"Delete"
   buttons don't work, and nothing is persisted. It ships partly-built.
3. **Only 3 of 12 projects are ever shown**, with no way to see the rest.
4. A layer of **dead code, unused assets, and unused dependencies**.
5. **No dark mode** despite a dark palette being defined in the README and
   `theme-color`.

| Area | Severity |
|------|----------|
| Deployment URL / repo mismatch | 🔴 High |
| Admin panel non-functional & unprotected | 🔴 High |
| Only 3 projects visible | 🟠 Medium |
| Data-quality bugs (dup IDs, typos, bad URL) | 🟠 Medium |
| Dead code / unused deps / unused assets | 🟠 Medium |
| No dark mode | 🟡 Low–Med |
| Mobile in-page navigation missing | 🟡 Low–Med |
| Performance (fonts, bundle, images) | 🟡 Low |
| Test coverage | 🟡 Low |

---

## 1. 🔴 High-priority issues

### 1.1 Deployment targets the wrong repository and URL
- Git remote is `https://github.com/mohit-uniyal-dev/reume.git` — note the
  **typo `reume`**.
- But `.github/workflows/deploy.yml`, `.env.production`, `.env.example`, and
  `docs/github-pages-hosting.md` all reference **`mohit7th.github.io/resume`** and
  **`github.com/Mohit7th/resume`** — a different account and repo name.
- `getRouterBasename()` in [publicPath.ts](../src/utils/publicPath.ts#L28-L37)
  derives the base path from the live hostname/repo name at runtime, so it would
  resolve `/reume`, while `VITE_SITE_URL` claims `/resume`. These disagree.

**Action:** Decide the canonical repo name (ideally rename `reume` → `resume`),
then update the workflow env, both `.env` files, and the hosting doc to match. If
you want a clean URL, a user-Pages repo (`<username>.github.io`) removes the
subpath problem entirely.

### 1.2 Admin panel is half-built, unprotected, and non-persistent
The `/admin` route is only gated by `VITE_ENABLE_ADMIN` (a build flag) — there is
**no actual authentication**:
- [LoginFormDialog.tsx](../src/components/ui/LoginFormDialog.tsx#L29) —
  `handleLogin() {}` is empty. Login does nothing.
- [AuthContext.tsx](../src/context/AuthContext.tsx) exists but `useAuth` is
  **never consumed anywhere**. The admin route isn't wrapped in an auth guard.
- In [ProjectBlock.tsx](../src/components/admin/ProjectBlock.tsx#L67) and
  [WorkHistoryBlock.tsx](../src/components/admin/WorkHistoryBlock.tsx#L67) the
  "Add" button actually dispatches an **update** action, and `handleDelete` only
  calls `stopPropagation()` — it deletes nothing.
- Edits go to an in-memory `useReducer` with **no backend and no localStorage**,
  so any change is lost on refresh.
- `AdminPanel` wraps its **own** `UserDataProvider`, separate from
  `ResumeHome`'s — even if editing worked, changes could never reflect on the
  home page.
- [TitleHeaderBlock.tsx](../src/components/admin/TitleHeaderBlock.tsx#L62) only
  edits `name` and `title` (not contact/socials/image), and has a typo
  `justifyContent: "cneter"`.

**Action:** Pick one direction:
- **(a) Drop it** — remove the admin panel, `AuthContext`, and the unused UI
  dialogs. Keep the site a clean static résumé driven by `data.tsx`. _(Recommended
  — lowest effort, removes the most risk and dead code.)_
- **(b) Finish it** — add real auth (a backend or at minimum a hosted API),
  persist to a datastore, wire delete/add, and share a single provider. This is a
  meaningfully larger project.

---

## 2. 🟠 Medium-priority issues

### 2.1 Only 3 of 12 projects are ever displayed
[Projects.tsx](../src/components/home/Projects.tsx#L23-L33) picks **one project
per category** (`.find` returns the first match), so 9 projects in `data.tsx` are
invisible. There's a fully-written `ProjectModal` component intended to show
project detail — but it's **never imported/used**.

**Action:** Add a "View all projects" experience — a filterable grid (by
category), or wire up the existing `ProjectModal` in a dialog on card click. This
is your strongest content and it's mostly hidden.

### 2.2 Data-quality bugs in `data.tsx`
- **Duplicate `_id: "30"`** — used for both "Material UI" and "SQL Server". Since
  React keys and lookups rely on `_id`, this can cause subtle rendering bugs.
- **Two projects named "Join Cherry"** (web + extension) — confusing; differentiate
  the names.
- Web Resume project has `url: "navigate('/')"` — a literal string, not a URL.
  It's currently saved only by the `^https?://` guard in `Projects.tsx`.
- Typo `type: "reporing"` (Crystal Reports) — should be `"reporting"`.
- Skill `experience` values (`"5 years"`, `"Developing"`) are stored but **never
  displayed** — either surface them (e.g. as tooltips/labels) or drop the field.

### 2.3 Dead code, unused dependencies, and unused assets
Confirmed unused via grep:

| Category | Items |
|----------|-------|
| **Unused components** | `ProjectModal`, `LoginFormDialog`, `RatingFormDialog`, `InputFileUpload`, `CustomAccordian` (also a spelling: "Accordian") |
| **Unused context** | `AuthContext` / `useAuth` |
| **Unused deps** | `use-immer` (reducer uses manual spread, no immer), `@fontsource/roboto` (site uses Poppins via Google Fonts) |
| **CRA leftovers** | `src/logo.svg`, `src/react-app-env.d.ts` |
| **Unused public assets** | `mypic.jpg` (137 KB), `financial.jpg`, `login.svg`, `liquid-cheese.svg`, `resume.png`, `data.svg`?/others — verify before deleting |

**Action:** Delete unused components/assets and `npm uninstall use-immer
@fontsource/roboto`. This shrinks the repo, the build, and cognitive load.
`mypic.jpg` alone is 137 KB shipped for nothing (the avatar uses a GitHub URL).

### 2.4 `ProjectModal` has a real bug
[ProjectModal.tsx](../src/components/ui/ProjectModal.tsx#L11) does
`const theme = useTheme;` — it assigns the hook **reference** instead of calling
it (`useTheme()`), and imports it from `@emotion/react` rather than
`@mui/material`. If you keep/reuse this component, fix both.

---

## 3. 🟡 UI / UX improvements (for better UX)

### 3.1 Add a dark mode
The README documents a full dark palette and `manifest.json`/`theme-color` use
`#2D336B`, but the app only ships a light theme. The `AppBar` background is even
**hardcoded** (`rgba(252,251,250,0.9)`) rather than theme-driven.

**Option A (recommended):** Add a MUI `colorSchemes: { light, dark }` theme + a
toggle in the header, persisted to `localStorage`, defaulting to
`prefers-color-scheme`. Replace the hardcoded AppBar/Footer colors with theme
tokens so both modes work.

**Option B (lighter):** Respect `prefers-color-scheme` only (no toggle).

### 3.2 Mobile in-page navigation is missing
In [MainLayout.tsx](../src/components/layout/MainLayout.tsx#L85-L102) the nav
links are `display: { xs: "none", md: "flex" }` with **no hamburger/drawer**
fallback. On phones users lose Work/Experience/Skills/About/Contact navigation
entirely — only the résumé button remains.

**Action:** Add a `Drawer` + menu `IconButton` for `xs`/`sm`.

### 3.3 Surface more of your strengths on the page
- **Skills experience levels** — you have per-skill years; showing them (bars,
  badges, or sorted "most experienced first") communicates seniority instantly.
- **Metrics/impact** — the work-history bullets are task-oriented; adding one or
  two quantified outcomes (users, performance %, clients) reads much stronger to
  recruiters.
- **Section scroll-spy** — highlight the active nav item as the user scrolls.

### 3.4 Smaller polish
- `theme-color` meta is `#2D336B` (dark blue) but the header is near-white — the
  mobile browser chrome color won't match the actual top of the page.
- `NotFound` page is a bare inline-styled `<div>` — restyle with MUI/theme to
  match the rest of the site.
- Personal **phone number and address** ship in the client bundle
  (`data.tsx`) — fine if intentional, but consider a contact form or mailto-only
  to reduce scraping.

---

## 4. 🟡 Performance

Current production build: `index.js` ≈ **280 KB**, `UserContext` chunk ≈ **149 KB**,
`AdminPanel` chunk ≈ 96 KB (lazy — good). Total first-load JS ≈ 430 KB (uncompressed).

| Opportunity | Detail |
|-------------|--------|
| **Fonts** | Poppins loads via a render-blocking Google Fonts `<link>` with no `preconnect`. Add `<link rel="preconnect">` to `fonts.gstatic.com`, or self-host with `@fontsource/poppins`. Also remove the unused `@fontsource/roboto`. |
| **Vendor splitting** | Consider `build.rollupOptions.output.manualChunks` to split MUI/React vendor code for better long-term caching. |
| **Images** | Serve project images as **WebP/AVIF** (currently JPG/PNG). Add explicit `width`/`height` (or aspect-ratio) to avoid layout shift. Delete the 137 KB unused `mypic.jpg`. |
| **PDF** | The 166 KB résumé PDF is copied into `build/assets` — fine, but ensure it's the latest version. |
| **`AdminPanel` chunk** | If you drop the admin panel (§1.2a), you remove ~96 KB of build output and the second `UserDataProvider`. |

Quick wins: run a Lighthouse pass after fixing fonts + images; you should land in
the 90s across the board given the page is mostly static.

---

## 5. 🟢 SEO & metadata (mostly good, small gaps)

Already strong: description, keywords, Open Graph, Twitter card, JSON-LD
`Person`, `<noscript>` résumé. Gaps:

- **No `og:image` / `twitter:image`** — social shares will have no preview image.
  Add a 1200×630 OG image (a branded card works well).
- **No `<link rel="canonical">`** — you already have `VITE_SITE_URL` defined but
  unused; wire it in.
- `robots.txt` allows all (fine). `manifest.json` icons (`logo192/512.png`) look
  like the **default CRA React logos** — replace with your own icon/monogram.

---

## 6. 🟡 Testing & code quality

- Only **one test** exists (`App.test.tsx`, hero smoke test). Add coverage for
  `Projects` filtering, `WorkHistory` duration formatting, and especially
  `dateUtils`.
- [dateUtils.ts](../src/utils/dateUtils.ts) **throws** on an invalid date. Since
  `TitleHeader` feeds it `workHistory[0]?.startDate`, malformed data would crash
  the hero. Consider returning a safe default instead of throwing in a render path.
- `calculateYearsAndMonths` ignores the day-of-month, so durations can be off by
  up to a month at boundaries — acceptable for a résumé, worth a comment.
- Naming: `CustomAccordian` / `gloabal.tsx` are misspelled filenames.

---

## 7. Suggested order of work

1. **Fix deployment** repo/URL mismatch (§1.1) — otherwise nothing else matters.
2. **Decide the admin panel's fate** (§1.2) — recommend removing it; big cleanup.
3. **Show all projects** + fix data-quality bugs (§2.1, §2.2).
4. **Delete dead code / unused deps / assets** (§2.3).
5. **Dark mode + mobile nav drawer** (§3.1, §3.2).
6. **Perf pass**: fonts, images, canonical + OG image (§4, §5).
7. **Add tests + harden `dateUtils`** (§6).

---

## 8. What's already good (keep it)

- Clean, tokenized MUI theme and consistent spacing/typography.
- Accessibility fundamentals: skip link, `aria-label`s, semantic sections,
  `prefers-reduced-motion` handling, keyboard-friendly links.
- Data-driven content model — layout changes don't require rewriting content.
- Solid SEO baseline + JSON-LD + `<noscript>` fallback.
- Lazy-loaded admin route and lazy images on project cards.
- CI that typechecks, tests, and builds before deploy.
</content>
</invoke>
