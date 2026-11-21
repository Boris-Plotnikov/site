# Portfolio site

Personal site of Boris Plotnikov: https://boris-plotnikov.click/

React + TypeScript + Tailwind, built with Vite. English and German.

## Where the content is

All texts, projects, skills and contact data are in `src/content.ts`. The page (`src/App.tsx`) and the machine-readable files are generated from it, so a change there updates everything.

## Machine-readable versions

| URL | What it is |
|---|---|
| `/llms.txt` | The whole profile as Markdown, for AI assistants |
| `/llms-full.txt` | The same plus the README of every project |
| `/profile.json` | Structured data in English and German |
| `/sitemap.xml`, `/robots.txt` | For search engines |

The page itself is prerendered: `index.html` already contains the full text, so it is readable without JavaScript. Schema.org data (`Person` and `SoftwareSourceCode`) is in a JSON-LD block in `<head>`.

## Build

```bash
npm install
npm run dev      # development server
npm run build    # dist/: page, prerendered HTML and the files above
```

`npm run build` runs `vite build`, then a server build of `src/entry-server.tsx`, then `scripts/prerender.mjs`, which renders the page to HTML and writes the machine-readable files. `llms-full.txt` reads the project READMEs from the sibling folders (`../jobradar/README.md` and so on) when they exist.

## Rules for changes

- Colours only through the CSS variables in `src/index.css`.
- No comments in the built HTML, JS and CSS; the prerender step stops the build if the rendered page contains one.
- Adjacent text in JSX is written as one template string (`{`${label} →`}`), otherwise React adds comment markers to the prerendered HTML.

## Deployment

Every push to `main` is picked up by the server within 5 minutes and the site is rebuilt.
