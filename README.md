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
