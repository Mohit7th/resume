# Package Upgrade Plan

Last reviewed: 2026-07-09

## Goal

Upgrade the project packages to stable, current versions without breaking the resume site, GitHub Pages deployment, or basic local development.

This project originally used Create React App through `react-scripts@5.0.1`. React officially deprecated Create React App for new apps and recommends migrating existing apps to a framework or build tool such as Vite, Parcel, or Rsbuild. The project has now been migrated to Vite and the MUI major-version migration is complete.

Recommended path:

1. Apply low-risk patch/minor updates that are compatible with the current CRA setup.
2. Migrate the build tool from CRA to Vite.
3. Upgrade major packages after the build tool is modernized.
4. Validate each phase with build, tests, and a visual pass.

## Phase 3 execution status

Status on 2026-07-09: complete and validated.

Completed migration work:

- Upgraded `@mui/material` from `6.4.7` to `9.2.0`.
- Upgraded `@mui/icons-material` from `6.4.7` to `9.2.0`.
- Replaced removed `@mui/material/Grid2` imports with `@mui/material/Grid`.
- Moved stricter MUI layout props into `sx` where required.
- Migrated `ListItemText` typography customization from `primaryTypographyProps` to `slotProps.primary`.

Validation passed:

```bash
npm run typecheck
npm run build
npm test
npm outdated --json
```

`npm outdated --json` returned `{}`, so the project packages are current at the time of this review.

## Phase 2 execution status

Status on 2026-07-09: complete and validated.

Completed migration work:

- Removed `react-scripts`.
- Added `vite`, `@vitejs/plugin-react`, `vitest`, and `jsdom`.
- Upgraded TypeScript to `7.0.2`.
- Upgraded `@types/node` to `26.1.1`.
- Replaced CRA scripts with Vite/Vitest scripts.
- Moved the HTML entry from `public/index.html` to root `index.html`.
- Replaced `%PUBLIC_URL%` and `process.env.REACT_APP_*` usage with Vite equivalents.
- Converted test setup from Jest to Vitest.
- Removed unused CRA template dependencies: `@types/jest`, `@testing-library/user-event`, and `web-vitals`.
- Removed unused `src/reportWebVitals.ts`.
- Lazy-loaded the `/admin` editor route so it is split from the public resume bundle.

Validation passed:

```bash
npm run build
npm test
```

Build output verified relative asset paths such as `./assets/...`, `./manifest.json`, and `./assets/Mohit_Uniyal.pdf`.

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
| `@mui/icons-material` | `9.2.0` | `9.2.0` | `9.2.0` | Low | Phase 3 complete. |
| `@mui/material` | `9.2.0` | `9.2.0` | `9.2.0` | Low | Phase 3 complete. |
| `@testing-library/dom` | `10.4.1` | `10.4.1` | `10.4.1` | Low | Phase 1 complete. |
| `@testing-library/jest-dom` | `6.9.1` | `6.9.1` | `6.9.1` | Low | Phase 1 complete. |
| `@testing-library/react` | `16.3.2` | `16.3.2` | `16.3.2` | Low | Phase 1 complete. |
| `@types/node` | `26.1.1` | `26.1.1` | `26.1.1` | Low | Phase 2 complete. |
| `@types/react` | `19.2.17` | `19.2.17` | `19.2.17` | Low | Phase 1 complete. |
| `@types/react-dom` | `19.2.3` | `19.2.3` | `19.2.3` | Low | Phase 1 complete. |
| `react` | `19.2.7` | `19.2.7` | `19.2.7` | Medium | Phase 1 complete. |
| `react-dom` | `19.2.7` | `19.2.7` | `19.2.7` | Medium | Phase 1 complete. |
| `react-router-dom` | `7.18.1` | `7.18.1` | `7.18.1` | Medium | Phase 1 complete. Verify routes manually before release. |
| `react-scripts` | removed | removed | `5.0.1` | None | Phase 2 complete; no longer used. |
| `typescript` | `7.0.2` | `7.0.2` | `7.0.2` | Low | Phase 2 complete. |
| `use-immer` | not outdated | not outdated | not outdated | Low | Leave as-is. |
| `web-vitals` | removed | removed | `5.3.0` | None | Removed because metrics reporting was unused. |
| `vite` | `8.1.4` | `8.1.4` | `8.1.4` | Low | Phase 2 complete. |
| `@vitejs/plugin-react` | `6.0.3` | `6.0.3` | `6.0.3` | Low | Phase 2 complete. |
| `vitest` | `4.1.10` | `4.1.10` | `4.1.10` | Low | Phase 2 complete. |

## Why not upgrade everything at once?

The package upgrade was split into phases because each group had different compatibility risks:

1. CRA, TypeScript, Jest, and Webpack were tightly coupled through `react-scripts`, so the build-tool migration had to happen separately.
2. MUI v9 was a major UI-library migration and required source changes for Grid imports and stricter prop types.
3. React Router v7 minor upgrades were manageable but still required route and GitHub Pages basename validation.

## Phase 0: Baseline before package changes

Run and record the current status before touching versions:

```bash
npm ci
npm run build
npm test
npm audit --omit=dev
```

Manual checks:

- Home page renders.
- Header navigation scrolls to each section.
- Resume PDF download works.
- Project images load under a subfolder path.
- `/admin` is unavailable when `VITE_ENABLE_ADMIN=false`.
- `/admin` is available locally when `VITE_ENABLE_ADMIN=true`.

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

- `@mui/material`
- `@mui/icons-material`

Validation gate:

```bash
npm run build
npm test
```

If build fails, revert the package group and split the update into smaller sets:

1. React + React DOM + React types
2. MUI + Emotion
3. React Router
4. Testing Library

## Phase 2: Migrate from CRA to Vite

Status: complete.

Target: remove the package constraint created by `react-scripts`.

Completed package changes:

- Removed `react-scripts`.
- Added `vite`.
- Added `@vitejs/plugin-react`.
- Added `vitest` and `jsdom`.
- Upgraded TypeScript to latest stable.
- Migrated tests from Jest to Vitest.

Completed source changes:

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
- Move `public/index.html` to Vite's root `index.html` model.
- Replace `%PUBLIC_URL%` usage in HTML.
- Replace CRA env naming with Vite naming:

```env
VITE_SITE_URL=...
VITE_RESUME_PDF_PATH=...
VITE_ENABLE_ADMIN=...
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

## Phase 3: MUI major migration after Vite

Status: complete.

Target: move the remaining outdated MUI packages to current stable majors after the toolchain is modern.

Completed package changes:

| Package group | Target | Notes |
| --- | --- | --- |
| MUI | `9.2.0` | Complete. |
| MUI icons | `9.2.0` | Complete; kept on the same major as `@mui/material`. |

MUI-specific changes made:

- Replaced `@mui/material/Grid2` imports with `@mui/material/Grid`.
- Moved removed layout props into `sx` where required by stricter MUI v9 types.
- Replaced `ListItemText` `primaryTypographyProps` with `slotProps.primary`.
- Searched for removed/deprecated props:

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
