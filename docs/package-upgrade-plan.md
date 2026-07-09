# Package Upgrade Plan

Last reviewed: 2026-07-09

## Goal

Upgrade the project packages to stable, current versions without breaking the resume site, GitHub Pages deployment, or basic local development.

The important constraint is that this project still uses Create React App through `react-scripts@5.0.1`. React officially deprecated Create React App for new apps and recommends migrating existing apps to a framework or build tool such as Vite, Parcel, or Rsbuild. Because of that, the safest plan is not a single large version bump.

Recommended path:

1. Apply low-risk patch/minor updates that are compatible with the current CRA setup.
2. Migrate the build tool from CRA to Vite.
3. Upgrade major packages after the build tool is modernized.
4. Validate each phase with build, tests, and a visual pass.

## Phase 1 execution status

Status on 2026-07-09: partially complete and validated.

Completed updates:

- `react` and `react-dom` to `19.2.7`
- React type packages to `19.2.x`
- `react-router-dom` to `7.18.1`
- Testing Library patch/minor packages except `@testing-library/user-event`
- `@emotion/styled` to `11.14.1`
- `@fontsource/roboto` to `5.2.10`

Deferred from phase 1:

- `@mui/material@6.5.0`
- `@mui/icons-material@6.5.0`

Reason: `@mui/material@6.5.0` failed the CRA production build with `Can't resolve './styles/index.js' in node_modules/@mui/material`. The Jest run also hit ESM parsing from the updated package. MUI was rolled back to `6.4.7`, and build/tests passed again. Treat MUI as part of the Vite/MUI migration work rather than a safe CRA-compatible patch.

## Current package snapshot

Registry data captured with:

```bash
npm outdated --json
```

| Package | Installed | Wanted by current range | Latest | Risk | Recommendation |
| --- | ---: | ---: | ---: | --- | --- |
| `@emotion/react` | not outdated | not outdated | not outdated | Low | Leave as-is unless MUI requires a newer peer. |
| `@emotion/styled` | `11.14.1` | `11.14.1` | `11.14.1` | Low | Phase 1 complete. |
| `@fontsource/roboto` | `5.2.10` | `5.2.10` | `5.2.10` | Low | Phase 1 complete. |
| `@mui/icons-material` | `6.4.7` | `6.5.0` | `9.2.0` | High for major | Keep at `6.4.7` on CRA. Move with MUI migration after Vite. |
| `@mui/material` | `6.4.7` | `6.5.0` | `9.2.0` | High for major | Keep at `6.4.7` on CRA. `6.5.0` failed build validation. |
| `@testing-library/dom` | `10.4.1` | `10.4.1` | `10.4.1` | Low | Phase 1 complete. |
| `@testing-library/jest-dom` | `6.9.1` | `6.9.1` | `6.9.1` | Low | Phase 1 complete. |
| `@testing-library/react` | `16.3.2` | `16.3.2` | `16.3.2` | Low | Phase 1 complete. |
| `@testing-library/user-event` | `13.5.0` | `13.5.0` | `14.6.1` | Medium | Delay until test migration/review because v14 has behavior/API differences. |
| `@types/jest` | `27.5.2` | `27.5.2` | `30.0.0` | High with CRA Jest | Keep until test runner is migrated. CRA owns the Jest stack. |
| `@types/node` | `16.18.126` | `16.18.126` | `26.1.1` | Medium | Do not jump blindly. Align with the Node version used in CI/build. |
| `@types/react` | `19.2.17` | `19.2.17` | `19.2.17` | Low | Phase 1 complete. |
| `@types/react-dom` | `19.2.3` | `19.2.3` | `19.2.3` | Low | Phase 1 complete. |
| `react` | `19.2.7` | `19.2.7` | `19.2.7` | Medium | Phase 1 complete. |
| `react-dom` | `19.2.7` | `19.2.7` | `19.2.7` | Medium | Phase 1 complete. |
| `react-router-dom` | `7.18.1` | `7.18.1` | `7.18.1` | Medium | Phase 1 complete. Verify routes manually before release. |
| `react-scripts` | `5.0.1` | `5.0.1` | `5.0.1` | High strategic risk | Do not expect further modernization here. Replace with Vite in phase 2. |
| `typescript` | `4.9.5` | `4.9.5` | `7.0.2` | High with CRA | Keep on CRA. Upgrade only after Vite migration. |
| `use-immer` | not outdated | not outdated | not outdated | Low | Leave as-is. |
| `web-vitals` | `2.1.4` | `2.1.4` | `5.3.0` | Medium | Delay unless `reportWebVitals` is actively used and migrated. |

## Why not upgrade everything at once?

Three package groups have different compatibility risks:

1. `react-scripts`, TypeScript, Jest, and Webpack are tied together by Create React App. A major TypeScript or Jest upgrade can fail even when the application code is fine.
2. MUI v9 is a major UI-library migration. The app currently imports `Grid` from `@mui/material/Grid2` in several files; MUI v9 migration docs show Grid API cleanup and removal of legacy/deprecated APIs. This should be handled as a separate UI migration.
3. React Router v7 minor upgrades are usually manageable, but routing needs manual verification because this site has GitHub Pages basename handling.

## Phase 0: Baseline before package changes

Run and record the current status before touching versions:

```bash
npm ci
npm run build
npm test -- --watchAll=false
npm audit --omit=dev
```

Manual checks:

- Home page renders.
- Header navigation scrolls to each section.
- Resume PDF download works.
- Project images load under a subfolder path.
- `/admin` is unavailable when `REACT_APP_ENABLE_ADMIN=false`.
- `/admin` is available locally when `REACT_APP_ENABLE_ADMIN=true`.

## Phase 1: Safe CRA-compatible updates

Target: reduce stale packages without changing the build system.

Update these together:

```bash
npm install \
  react@19.2.7 \
  react-dom@19.2.7 \
  @types/react@19.2.17 \
  @types/react-dom@19.2.3 \
  @emotion/styled@11.14.1 \
  @fontsource/roboto@5.2.10 \
  @testing-library/dom@10.4.1 \
  @testing-library/jest-dom@6.9.1 \
  @testing-library/react@16.3.2 \
  react-router-dom@7.18.1
```

Do not include MUI in this command while the project is still on CRA. `@mui/material@6.5.0` failed build validation in this repo.

Do not update these in phase 1:

- `react-scripts`
- `typescript`
- `@types/jest`
- `@testing-library/user-event`
- `@types/node`
- `web-vitals`
- `@mui/material`
- `@mui/icons-material`

Validation gate:

```bash
npm run build
npm test -- --watchAll=false
```

If build fails, revert the package group and split the update into smaller sets:

1. React + React DOM + React types
2. MUI + Emotion
3. React Router
4. Testing Library

## Phase 2: Migrate from CRA to Vite

Target: remove the package constraint created by `react-scripts`.

Planned package changes:

- Remove `react-scripts`.
- Add `vite`.
- Add `@vitejs/plugin-react`.
- Add `typescript` latest stable after the Vite build is working.
- Decide whether to keep Jest temporarily or migrate tests to Vitest.

Expected source changes:

- Replace CRA scripts:

```json
{
  "scripts": {
    "start": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

- Create `vite.config.ts` with `base: "./"` for GitHub Pages/subfolder hosting.
- Move or adapt `public/index.html` to Vite's root `index.html` model.
- Replace `%PUBLIC_URL%` usage in HTML.
- Replace CRA env naming:

```env
REACT_APP_SITE_URL=...
```

with Vite naming:

```env
VITE_SITE_URL=...
```

- Update `src/config/siteConfig.ts` from `process.env.REACT_APP_*` to `import.meta.env.VITE_*`.
- Replace `src/react-app-env.d.ts` with Vite env typing.

Validation gate:

```bash
npm run build
npm run preview
npm test
```

Manual checks:

- Site works at `/`.
- Site works when served from a subfolder.
- Static assets resolve.
- PDF download resolves.
- Routing works on refresh where the host supports SPA fallback.

## Phase 3: Major dependency upgrades after Vite

Target: move to current stable majors after the toolchain is modern.

Upgrade candidates:

| Package group | Target | Notes |
| --- | --- | --- |
| TypeScript | `7.0.2` | Upgrade after Vite is stable. Run strict type/build checks. |
| MUI | `9.2.0` | Use official MUI v7 and v9 migration guides. Do this in a dedicated branch. |
| MUI icons | `9.2.0` | Keep the same major as `@mui/material`. |
| `@testing-library/user-event` | `14.6.1` | Update tests for async/user interaction changes. |
| Jest types/test runner | latest compatible | Prefer Vitest if Vite is adopted. |
| `web-vitals` | `5.3.0` | Only if metrics reporting is still used. |
| `@types/node` | latest or build-runtime-aligned | Align with the Node version used by local dev and CI. |

MUI-specific checks:

- Replace `@mui/material/Grid2` imports if the v9 migration requires `@mui/material/Grid`.
- Run MUI codemods where applicable.
- Search for removed/deprecated props:

```bash
rg "Grid2|TransitionComponent|TransitionProps|disableEscapeKeyDown|GridLegacy|MuiTouchRipple|OutlineIcon|InfoOutline|DeleteOutline" src
```

## Phase 4: Cleanup and release

After all package upgrades:

```bash
npm dedupe
npm audit --omit=dev
npm run build
npm test
```

Then manually verify:

- Desktop layout
- Mobile layout
- About section spacing/text alignment
- Experience section
- Project cards/images
- Contact/download buttons
- GitHub Pages build output

## Rollback plan

Use one commit per phase:

1. Baseline/prep
2. CRA-compatible package updates
3. Vite migration
4. Major UI/tooling upgrades

If a phase fails, revert only that phase. Do not mix Vite migration, TypeScript major upgrade, and MUI major upgrade in the same commit.

## Source references

- React: [Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)
- React: [React 19 release notes](https://react.dev/blog/2024/12/05/react-19)
- MUI: [Upgrade to v7](https://mui.com/material-ui/migration/upgrade-to-v7/)
- MUI: [Upgrade to v9](https://mui.com/material-ui/migration/upgrade-to-v9/)
- React Router: [Upgrading from v6](https://reactrouter.com/upgrading/v6)
- React Router: [Updating from v7](https://reactrouter.com/upgrading/v7)
- npm registry snapshot: `npm outdated --json` run locally on 2026-07-09
