import { useEffect, useState } from "react";
import { Lang, PROJECTS, TEXT } from "./content";

const GITHUB = "https://github.com/Boris-Plotnikov";
const EMAIL = "boris.a.plotnikov@gmail.com";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de") return saved;
  } catch {
  }
  return navigator.language.startsWith("de") ? "de" : "en";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = TEXT[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
    }
  }, [lang]);

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="#top" className="font-bold">Boris Plotnikov</a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#projects" className="hidden hover:text-accent sm:inline">{t.projectsTitle}</a>
            <a href="#skills" className="hidden hover:text-accent sm:inline">{t.skillsTitle}</a>
            <a href="#contact" className="hidden hover:text-accent sm:inline">{t.ctaContact}</a>
            <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs">
              {(["en", "de"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`rounded-md px-2 py-1 uppercase ${lang === l ? "bg-ink text-white" : "text-muted"}`}>{l}</button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-5xl px-4 pb-16 pt-14 md:pt-20">
        <div className="text-sm font-semibold uppercase tracking-wide text-accent">{t.role}</div>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{t.hero}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{t.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white hover:opacity-90">{t.ctaProjects}</a>
          <a href="#contact" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50">{t.ctaContact}</a>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold">{t.pathTitle}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {t.path.map((p, i) => (
              <li key={p.years} className="relative">
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${i === t.path.length - 1 ? "bg-accent" : "bg-ink"}`} />
                  <span className="text-xs font-semibold text-muted">{p.years}</span>
                </div>
                <div className="mt-2 font-semibold">{p.title}</div>
                <p className="mt-1 text-sm text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold">{t.projectsTitle}</h2>
        <p className="mt-2 text-sm text-muted">{t.projectsNote}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const text = p.text[lang];
            return (
              <article key={p.key} className={`card flex flex-col p-6 ${i === 0 ? "md:col-span-2" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  {p.demo && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">● live</span>}
                </div>
                <p className="mt-2 text-slate-700">{text.tagline}</p>
                <ul className="mt-3 space-y-1 text-sm text-muted">{text.points.map((x) => <li key={x}>- {x}</li>)}</ul>
                <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium">{s}</span>)}</div>
                <div className="mt-auto flex flex-wrap gap-3 pt-5 text-sm font-semibold">
                  {p.demo && <a href={p.demo} className="text-accent hover:underline">{t.live} →</a>}
                  {p.extra && <a href={p.extra.href} className="text-accent hover:underline">{p.extra.label} →</a>}
                  <a href={`${GITHUB}/${p.key}`} className="text-muted hover:text-ink">{t.code} ↗</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="skills" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-2xl font-bold">{t.skillsTitle}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {t.skills.map((g) => (
              <div key={g.group}>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">{g.group}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">{g.items.map((s) => <span key={s} className="rounded-lg border border-slate-200 px-2.5 py-1 text-sm">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-4 py-16">
        <div className="card bg-ink p-8 text-white md:p-12">
          <h2 className="text-3xl font-bold">{t.contactTitle}</h2>
          <p className="mt-3 max-w-xl text-white/80">{t.contactText}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <a href={`mailto:${EMAIL}`} className="rounded-xl bg-white px-5 py-3 text-ink">{EMAIL}</a>
            <a href="https://www.linkedin.com/" className="rounded-xl border border-white/30 px-5 py-3">LinkedIn</a>
            <a href={GITHUB} className="rounded-xl border border-white/30 px-5 py-3">GitHub</a>
          </div>
        </div>
      </section>

      <footer className="pb-10 text-center text-xs text-muted">{t.footer}</footer>
    </div>
  );
}
