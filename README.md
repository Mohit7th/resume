# Mohit Uniyal Resume

Personal resume website built with React, TypeScript, Material UI, and Vite.

## Configuration

Copy `.env.example` to `.env.local` for local overrides:

```bash
cp .env.example .env.local
```

Available public build-time settings:

- `VITE_SITE_URL`: deployed site URL, useful for future canonical/analytics configuration.
- `VITE_RESUME_PDF_PATH`: path or URL for the downloadable resume PDF.
- `VITE_ENABLE_ADMIN`: set to `true` only when the `/admin` editor route should be available.
- `VITE_ADMIN_PASSWORD`: password for the `/admin` editor. **This is a static
  site with no backend, so this only hides the editor UI — it is not real
  security.** Change it from the default before enabling admin in production.

## Editing content (`/admin`)

The site content lives in `src/components/data.tsx` (the bundled default). A
lightweight editor is available at `/admin` when `VITE_ENABLE_ADMIN=true`:

1. Run locally with the editor enabled: `VITE_ENABLE_ADMIN=true npm start`.
2. Visit `/admin` and sign in with `VITE_ADMIN_PASSWORD`.
3. Edit the header, summary, skills, projects, and work history. Click **Save**.

The **public site always renders the committed content** in
`src/components/data.tsx`, so any change there (or a redeploy) shows immediately.
Admin edits are a **local draft** saved to your browser's `localStorage`; saving
also previews them on the site within the current session. To publish for
everyone, use **Export** to download `resume-data.json` and commit it (or paste
its values into `src/components/data.tsx`), then redeploy. **Import** and **Reset
to defaults** are also available.

For GitHub Pages/subfolder hosting, `vite.config.ts` uses `base: "./"` so the production build uses relative asset paths.

## Scripts

Run the local dev server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Preview the production build locally:

```bash
npm run preview
```

## Color palette

Light:

- `#FFF2F2`
- `#A9B5DF`
- `#7886C7`
- `#2D336B`

Dark:

- `#222831`
- `#31363F`
- `#76ABAE`
- `#EEEEEE`
