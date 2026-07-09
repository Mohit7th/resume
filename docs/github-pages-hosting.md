# GitHub Pages Hosting Guide

This project is ready to host as a static site on GitHub Pages.

Target repository:

```text
https://github.com/Mohit7th/resume
```

Expected GitHub Pages URL:

```text
https://mohit7th.github.io/resume
```

The app uses Vite and builds into the `build` folder. `vite.config.ts` is configured with:

```ts
base: "./"
```

That makes the generated files portable for both:

- user/organization Pages, for example `https://username.github.io/`
- project Pages, for example `https://username.github.io/repository-name/`

## Pre-deployment checklist

Before publishing, run:

```bash
npm install
npm run typecheck
npm test
npm run build
```

Or use the release helper:

```bash
powershell -ExecutionPolicy Bypass -File scripts/create-release.ps1
```

The helper validates the repo, runs the release checks, creates a local release tag, and prints push commands. It does not push unless you pass `-Push`.

Confirm the generated `build/index.html` uses relative paths such as:

```html
./assets/...
./manifest.json
./assets/Mohit_Uniyal.pdf
```

## Environment configuration

For public hosting, keep admin disabled unless you intentionally want the editor route available.

Create `.env.local` only if you need local overrides:

```bash
cp .env.example .env.local
```

Useful deployment values:

```env
VITE_SITE_URL=https://mohit7th.github.io/resume
VITE_RESUME_PDF_PATH=/assets/Mohit_Uniyal.pdf
VITE_ENABLE_ADMIN=false
```

Notes:

- `VITE_SITE_URL` is currently available for site-level config/future metadata.
- `VITE_RESUME_PDF_PATH` can be a local public asset path or a full URL.
- `VITE_ENABLE_ADMIN=false` keeps `/admin` unavailable in the public build.
- Production defaults are committed in `.env.production` for the `Mohit7th/resume` GitHub Pages deployment.

## Option A: Host from a separate GitHub Pages repo

Use this if you want to keep source code in this repo and publish only static files to another repo.

1. Build this project:

```bash
npm run build
```

1. Create or open the repo that will host the site.

Examples:

- `YOUR_GITHUB_USERNAME.github.io` for a user site
- `resume-site` for a project site

1. Copy the contents of this project's `build` folder into the hosting repo.

Important: copy the contents of `build`, not the `build` folder itself.

Expected hosting repo structure:

```text
index.html
assets/
favicon.ico
manifest.json
logo192.png
logo512.png
```

1. Commit and push in the hosting repo:

```bash
git add .
git commit -m "Deploy resume site"
git push
```

1. In GitHub:

- Go to the hosting repo.
- Open Settings > Pages.
- Set Source to `Deploy from a branch`.
- Select the branch that contains the static files.
- Select `/root` as the folder.
- Save.

GitHub will show the published URL after the Pages build finishes.

## Recommended: Host this repo with GitHub Actions

This repo now includes:

```text
.github/workflows/deploy.yml
```

Use this path for `Mohit7th/resume`.

In GitHub:

- Go to `https://github.com/Mohit7th/resume`.
- Open Settings > Pages.
- Set Source to `GitHub Actions`.
- Push to `main`.
- Open the Actions tab and confirm the deployment completes.
- After it finishes, open `https://mohit7th.github.io/resume`.

If your local `origin` still points to an old repo, update it:

```bash
git remote set-url origin https://github.com/Mohit7th/resume.git
```

Then push:

```bash
git push origin main
```

You can also run:

```bash
powershell -ExecutionPolicy Bypass -File scripts/create-release.ps1 -Push
```

The script defaults to the `main` branch because the GitHub Pages workflow deploys from `main`.

## Option B: Generic GitHub Actions setup

Use this if you want GitHub to build and deploy automatically whenever you push.

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Typecheck
        run: npm run typecheck

      - name: Test
        run: npm test

      - name: Build
        run: npm run build
        env:
          VITE_SITE_URL: https://mohit7th.github.io/resume
          VITE_RESUME_PDF_PATH: /assets/Mohit_Uniyal.pdf
          VITE_ENABLE_ADMIN: "false"

      - name: Configure Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then in GitHub:

- Go to Settings > Pages.
- Set Source to `GitHub Actions`.
- Push to `main`.
- Open the Actions tab and confirm the deployment completes.

## Option C: Host from this repo using `/docs`

GitHub Pages can serve from a `/docs` folder, but this project already uses `docs` for project documentation. Do not use this option unless you intentionally want to separate or rename the documentation folder.

Recommended alternatives:

- Use Option A and copy `build` contents to a separate hosting repo.
- Use Option B and deploy the `build` folder with GitHub Actions.

## Routing notes

The public resume page works well on GitHub Pages.

This project uses `BrowserRouter`. The app includes a dynamic basename helper so project URLs like this work:

```text
https://username.github.io/repository-name/
```

Direct refresh on nested routes can still be limited by GitHub Pages because it does not provide SPA fallback routing by default.

Current impact:

- `/` works.
- Section links like `#work`, `#experience`, and `#contact` work.
- `/admin` should remain disabled for public hosting.

If you later need public nested routes, add a GitHub Pages SPA fallback strategy such as a custom `404.html` redirect.

## Post-deployment checks

After GitHub Pages publishes the site, verify:

- Homepage loads.
- Header navigation scrolls to sections.
- Resume PDF downloads.
- Project images load.
- Social links open correctly.
- Mobile layout is usable.
- Page refresh works on the homepage URL.
- Browser console has no missing asset errors.

## Troubleshooting

### Blank page

Check the browser console for missing JavaScript or CSS files. The build should reference assets with `./assets/...`.

If you see paths starting with `/assets/...`, rebuild after confirming `vite.config.ts` has:

```ts
base: "./"
```

### PDF download is broken

Confirm the file exists here:

```text
public/assets/Mohit_Uniyal.pdf
```

Then rebuild:

```bash
npm run build
```

### Admin page is visible

Set:

```env
VITE_ENABLE_ADMIN=false
```

Then rebuild and redeploy.

### GitHub Pages shows an old version

Hard refresh the browser and check the Pages deployment status in GitHub Actions or Settings > Pages. GitHub Pages can take a few minutes to update.
