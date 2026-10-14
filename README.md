# Vanshika Pandey — Portfolio

Static, responsive portfolio using HTML, scoped CSS and vanilla JavaScript. No framework or build dependencies.

## Run on localhost

From this directory: `python -m http.server 5173 --directory dist`, then open `http://localhost:5173`.

From the parent workspace instead: `python -m http.server 5173 --directory portfolio/dist`.

## Deploy on GitHub Pages

Upload the **contents of this portfolio directory** to the root of your GitHub repository, including the hidden `.github` directory. Use the `main` branch. The repository should contain:

```text
.github/workflows/pages.yml
.gitignore
README.md
dist/
  .nojekyll
  index.html
  styles.css
  app.js
  work-data.js
  assets/
```

1. Create a GitHub repository and upload these files, or push them using Git.
2. Open the repository's **Settings > Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Open **Actions > Deploy portfolio to GitHub Pages > Run workflow** on `main` for the initial deployment. Future pushes to `main` deploy automatically.
5. The successful deployment provides your live address, typically `https://USERNAME.github.io/REPOSITORY/`.

The workflow publishes only `dist/`. All local asset paths are relative, so CSS, JavaScript, images and the resume work under a repository subpath and under a custom domain. There is no npm install or build step.

Use `output/Vanshika-Portfolio-GitHub.zip` from the parent workspace for a clean upload package. It excludes the existing local `.git` history and Sites hosting identity. Keep `.github/workflows/pages.yml` at the repository root; do not upload the ZIP as a single file or nest the project inside another directory.

The GitHub publication checkout in this workspace is `tmp/github-publish`, with `origin` pointing to `Vikasyadav25/protfolio_cara`. Keep any existing Sites checkout identity separate. Do not upload `.openai/`, `tmp/`, or the research dossier.

Official reference: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Editing

- `dist/index.html`: page sections and career copy.
- `dist/styles.css`: responsive layout, visual direction and reduced-motion support.
- `dist/scrapbook.css`: screenshot-inspired paper texture, Behance collage, tilted Dribbble gallery and photo-led article cards.
- `dist/recruiter.css`: recruiter-focused hierarchy, responsive work grids and engagement display.
- `dist/dribbble-stats.js`: verified dated public shot views/likes snapshot.
- `dist/app.js`: project overview content, navigation, accessible native dialogs and copy-email interaction.
- `dist/work-data.js`: additional professional project details and the searchable Behance/Dribbble publication archive.
- `dist/assets`: locally stored original portfolio artwork, compressed WebP previews and downloadable resume.

Content is based on the research files in the workspace's `output` directory. Public explorations and professional work remain distinct. The enterprise artwork is an editorial illustration, not a client screen. Client-specific case-study details and measured outcomes were not fabricated. Confirm current job title/dates before external sharing.

Original artwork sources: `https://vanshika-pandey-protfolio.netlify.app/` and the candidate's linked Dribbble publications. The TelePay preview is only 200px in the original source; replace it with approved high-resolution screens when available. Fonts use Google Fonts with system fallbacks.

## Work presentation

The work section leads with six featured entries: PepsiCo, Pfizer, Bali.love, LeagueX, TelePay and To & From. Ten additional professional and public-concept entries remain available in the expandable More projects section. Impact figures are explicitly résumé-reported. The searchable archive contains 31 reviewed Behance publications and 24 visible Dribbble shots, preserving shared authorship/team attribution and avoiding a combined unique-project claim.

The Behance, Dribbble and writing sections retain original artwork and paper details from the supplied references, with clear headings, readable cards and a consistent recruiter-focused hierarchy. The artwork links point to the original publications. Article photos are reused from the earlier portfolio; exact screenshot article-cover assets were not supplied. The repeating paper texture is a small SVG filter asset, without an additional image or animation dependency.

Career details, capabilities, education, writing, public portfolio engagement and recommendation summaries are presented in dedicated sections. Figma access was unavailable during the update, so this is not claimed to match the unseen prototype exactly. The current website is published through GitHub Pages. The earlier private Sites deployment is separate.

## Refresh Dribbble engagement

Run `python scripts/refresh-dribbble.py` from the portfolio directory, review the changed snapshot, then push to GitHub. Counts are static, with the capture date displayed. Views retain Dribbble rounding; the total is approximate and covers the 24 archived shots. No frontend API or secret is required. Failed refreshes preserve the previous snapshot.

Tiger company reference links are explicitly labeled as company context. No client screenshot or specific product assignment could be verified as Vanshika’s work.

Tiger Analytics now has four separately navigable client-engagement cards. Their dialogs clearly attribute responsibilities to the overall Tiger role, because the résumé does not map specific deliverables to individual clients. Brand-colored card covers are editorial typography, not client dashboard screenshots.

## Portfolio assistant

The bottom-left portfolio guide runs entirely in the browser, using curated profile topics and existing project data. It supports project follow-ups, source links and an explicit fallback for unpublished facts. It is a local content guide, not a generative AI service. No chat API, key, external request or stored conversation is required. Extend topic aliases in `dist/portfolio-assistant.js` when adding verified content.

## Current interaction design

Desktop projects use sticky stacked cards with six pre-mounted preview faces. On phones, projects use a horizontal swipe carousel. `dist/project-showcase.css` and `dist/project-showcase.js` implement this behaviour without dependencies. The Dribbble gallery loops continuously, pauses on hover/focus, and respects reduced motion. The Behance collage features Insurance and Travel, with static diagonal lettering and an animated blue wave.

The header stays visible with one résumé link. The corner navigator shows the current and next section. Home metrics retain public-source scope and rounding notes. The assistant is a browser-only portfolio guide.
