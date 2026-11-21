import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const dist = join(root, "dist");
const ssr = join(root, "dist-ssr");

const { render, PROFILE, PROJECTS, TEXT } = await import(pathToFileURL(join(ssr, "entry-server.js")).href);
const today = new Date().toISOString().slice(0, 10);
const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const absolute = (href) => `${PROFILE.site}/${href.replace(/^\.\//, "")}`;
const en = TEXT.en;
const de = TEXT.de;

// Prerendered page
const body = render();
if (body.includes("<!--")) throw new Error("Rendered HTML contains comments");

const projects = PROJECTS.map((p) => ({
  key: p.key,
  name: p.name,
  stack: p.stack,
  live: p.demo ? absolute(p.demo) : null,
  code: `${PROFILE.github}/${p.key}`,
  readme: `https://raw.githubusercontent.com/${PROFILE.github.split("/").pop()}/${p.key}/main/README.md`,
  en: p.text.en,
  de: p.text.de,
}));

const profile = {
  updated: today,
  name: PROFILE.name,
  role: { en: en.role, de: de.role },
  headline: { en: en.hero, de: de.hero },
  about: { en: en.intro, de: de.intro },
  lookingFor: { en: en.contactText, de: de.contactText },
  location: PROFILE.location,
  availability: { hoursPerWeek: PROFILE.hoursPerWeek },
  education: PROFILE.university,
  languages: PROFILE.languages,
  contact: { email: PROFILE.email, github: PROFILE.github, site: PROFILE.site },
  path: { en: en.path, de: de.path },
  skills: { en: en.skills, de: de.skills },
  projects,
  notes: { en: en.projectsNote, de: de.projectsNote },
  source: `${PROFILE.github}/site`,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${PROFILE.site}/#person`,
      name: PROFILE.name,
      jobTitle: en.role,
      description: en.intro,
      email: `mailto:${PROFILE.email}`,
      url: PROFILE.site,
      sameAs: [PROFILE.github],
      address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
      alumniOf: { "@type": "CollegeOrUniversity", name: PROFILE.university },
      knowsLanguage: PROFILE.languages.map((l) => l.name),
      knowsAbout: en.skills.flatMap((g) => g.items),
    },
    ...projects.map((p) => ({
      "@type": "SoftwareSourceCode",
      name: p.name,
      description: p.en.tagline,
      codeRepository: p.code,
      url: p.live ?? p.code,
      programmingLanguage: p.stack,
      author: { "@id": `${PROFILE.site}/#person` },
    })),
  ],
};

let html = readFileSync(join(dist, "index.html"), "utf8");
html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
html = html.replace(
  "</head>",
  `<link rel="canonical" href="${PROFILE.site}/" />` +
    `<link rel="alternate" type="text/markdown" href="./llms.txt" title="Profile for AI assistants" />` +
    `<link rel="alternate" type="application/json" href="./profile.json" title="Profile data" />` +
    `<meta property="og:type" content="profile" />` +
    `<meta property="og:title" content="${attr(`${PROFILE.name} · ${en.role}`)}" />` +
    `<meta property="og:description" content="${attr(en.hero)}" />` +
    `<meta property="og:url" content="${PROFILE.site}/" />` +
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head>`,
);
writeFileSync(join(dist, "index.html"), html);

// Markdown for AI assistants
const list = (items) => items.map((x) => `- ${x}`).join("\n");
const llms = `# ${PROFILE.name}

> ${en.role}. ${en.hero}

Updated: ${today}. This file is generated from the same data as the website ${PROFILE.site}/ (repository: ${PROFILE.github}/site, data in \`src/content.ts\`). Structured version: ${PROFILE.site}/profile.json

## Profile

- Name: ${PROFILE.name}
- Role: ${en.role}
- Location: ${PROFILE.location}
- Education: ${PROFILE.university}, BSc Computer Science
- Availability: up to ${PROFILE.hoursPerWeek} hours per week
- Languages: ${PROFILE.languages.map((l) => `${l.name} ${l.level}`).join(", ")}
- Email: ${PROFILE.email}
- GitHub: ${PROFILE.github}

${en.intro}

Looking for: ${en.contactText}

## Path

${en.path.map((p) => `- ${p.years}: ${p.title}. ${p.text}`).join("\n")}

## Projects

${en.projectsNote}

${projects
  .map(
    (p) => `### ${p.name}

${p.en.tagline}

${list(p.en.points)}

- Stack: ${p.stack.join(", ")}
${p.live ? `- Live: ${p.live}\n` : ""}- Code: ${p.code}
- README: ${p.readme}`,
  )
  .join("\n\n")}

## Skills

${en.skills.map((g) => `- ${g.group}: ${g.items.join(", ")}`).join("\n")}

## Pages

- [Portfolio](${PROFILE.site}/)
${projects.filter((p) => p.live).map((p) => `- [${p.name}](${p.live})`).join("\n")}
- [Full text with all project READMEs](${PROFILE.site}/llms-full.txt)

## German version

- Rolle: ${de.role}
- ${de.hero}
- ${de.intro}
- Gesucht: ${de.contactText}
`;
writeFileSync(join(dist, "llms.txt"), llms);

// Full text with READMEs from sibling project folders
const readmes = projects
  .map((p) => join(root, "..", p.key, "README.md"))
  .map((file) => (existsSync(file) ? `\n\n---\n\n${readFileSync(file, "utf8").trim()}\n` : ""))
  .join("");
writeFileSync(join(dist, "llms-full.txt"), llms + readmes);

writeFileSync(join(dist, "profile.json"), JSON.stringify(profile, null, 2) + "\n");

// Crawlers
const pages = ["", ...projects.filter((p) => p.live).map((p) => p.live.replace(`${PROFILE.site}/`, "").replace(/#.*$/, ""))];
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...new Set(pages)].map((p) => `  <url><loc>${PROFILE.site}/${p}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`,
);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${PROFILE.site}/sitemap.xml\n`);

rmSync(ssr, { recursive: true, force: true });
console.log(`prerender: ${body.length} characters of HTML, llms.txt, llms-full.txt, profile.json, sitemap.xml, robots.txt`);
