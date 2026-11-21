export type Lang = "en" | "de";

export interface Project {
  key: string;
  name: string;
  stack: string[];
  demo?: string;
  extra?: { label: string; href: string };
  text: Record<Lang, { tagline: string; points: string[] }>;
}

export const PROJECTS: Project[] = [
  {
    key: "jobradar",
    name: "JobRadar",
    stack: ["Java 21", "Spring Boot 3", "PostgreSQL", "Claude API", "React"],
    demo: "./jobradar/#/showcase",
    text: {
      en: {
        tagline: "A real service that finds junior developer jobs in Europe every day and explains how well each one fits.",
        points: ["Collects from 4 job APIs, removes duplicates, filters by rules", "AI scoring with structured JSON output and a monthly budget", "Application board, cover letters in English and German, market insights"],
      },
      de: {
        tagline: "Ein echter Dienst, der täglich Junior-Stellen in Europa findet und erklärt, wie gut jede passt.",
        points: ["Sammelt aus 4 Job-APIs, entfernt Duplikate, filtert nach Regeln", "KI-Bewertung mit strukturierter JSON-Ausgabe und Monatsbudget", "Bewerbungs-Board, Anschreiben auf Englisch und Deutsch, Marktanalyse"],
      },
    },
  },
  {
    key: "fintrack",
    name: "FinTrack",
    stack: ["Java 21", "Spring Boot 3", "PostgreSQL", "React"],
    demo: "./fintrack/",
    text: {
      en: {
        tagline: "Money tracking for a company with three offices and four currencies — based on a real accounting system.",
        points: ["Corrections instead of deleting, full audit trail", "Transfers “in transit” until the receiver confirms", "Blind cash count at the end of a shift, anomaly detection, monthly reports"],
      },
      de: {
        tagline: "Finanzbuchhaltung für ein Unternehmen mit drei Standorten und vier Währungen — nach einem echten System.",
        points: ["Korrekturen statt Löschen, vollständiges Audit-Log", "Umbuchungen „unterwegs“ bis zur Bestätigung", "Blinde Kassenzählung am Schichtende, Anomalie-Erkennung, Monatsberichte"],
      },
    },
  },
  {
    key: "procuredesk",
    name: "ProcureDesk",
    stack: ["Java 21", "Spring Boot 3", "PostgreSQL", "React"],
    demo: "./procuredesk/",
    text: {
      en: {
        tagline: "Purchase-to-pay: from a purchase request to the paid invoice, with approvals by amount and a 3-way match.",
        points: ["Approval chain by amount: head → finance → director", "Department budgets: reserved, spent, available", "Goods receipt and invoice check against order and delivery"],
      },
      de: {
        tagline: "Purchase-to-Pay: von der Bedarfsanforderung bis zur bezahlten Rechnung, mit Freigaben nach Betrag und 3-Way-Match.",
        points: ["Freigabekette nach Betrag: Leitung → Controlling → Geschäftsführung", "Abteilungsbudgets: reserviert, ausgegeben, verfügbar", "Wareneingang und Rechnungsprüfung gegen Bestellung und Lieferung"],
      },
    },
  },
  {
    key: "stockkeeper",
    name: "StockKeeper",
    stack: ["C++17", "STL", "CMake", "GoogleTest", "WebAssembly"],
    demo: "./stockkeeper/",
    text: {
      en: {
        tagline: "Command-line warehouse tool: stock journal, reorder list, stocktaking, CSV files.",
        points: ["Stock can never go negative; failed operations change nothing", "Money in cents, no raw pointers, 22 unit tests", "Runs in the browser: the same C++ compiled to WebAssembly"],
      },
      de: {
        tagline: "Lagerverwaltung für die Kommandozeile: Bewegungsjournal, Nachbestellliste, Inventur, CSV-Dateien.",
        points: ["Bestand kann nie negativ werden; fehlgeschlagene Buchungen ändern nichts", "Beträge in Cent, keine rohen Zeiger, 22 Unit-Tests", "Läuft im Browser: derselbe C++-Code als WebAssembly"],
      },
    },
  },
  {
    key: "viennaroute",
    name: "ViennaRoute",
    stack: ["C++17", "Dijkstra", "CMake", "GoogleTest", "WebAssembly"],
    demo: "./viennaroute/",
    text: {
      en: {
        tagline: "Fastest trip through the Vienna U-Bahn: graph, Dijkstra with transfer cost, fuzzy station search.",
        points: ["States (station, line) make transfers cost time", "Finds “Stefansplatz” and “Laengenfeldgasse” despite typos", "Runs in the browser: the same C++ compiled to WebAssembly"],
      },
      de: {
        tagline: "Schnellste Fahrt durch die Wiener U-Bahn: Graph, Dijkstra mit Umsteigezeit, unscharfe Stationssuche.",
        points: ["Zustände (Station, Linie) machen Umstiege zeitlich teuer", "Findet „Stefansplatz“ und „Laengenfeldgasse“ trotz Tippfehlern", "Läuft im Browser: derselbe C++-Code als WebAssembly"],
      },
    },
  },
];

export const TEXT = {
  en: {
    role: "Junior Java Developer · Working Student",
    hero: "I build backend systems in Java and C++ that solve real business problems.",
    intro: "Computer Science student at the University of Vienna. Before university I spent six years leading procurement and IT at a company — so I know how the processes behind the software work. Available up to 20 hours per week.",
    ctaProjects: "See the projects",
    ctaContact: "Contact",
    pathTitle: "My path",
    path: [
      { years: "2017–2018", title: "Tax authority", text: "Supply and IT departments." },
      { years: "2019–2025", title: "Head of Procurement & IT Manager", text: "Gas transportation company: procurement, contracts, process control, team of 3." },
      { years: "since 2024", title: "BSc Computer Science", text: "University of Vienna. Java, C++, algorithms, databases." },
      { years: "2026", title: "Portfolio projects", text: "Five systems in Java and C++, all of them live — each shows its own source code." },
    ],
    projectsTitle: "Projects",
    projectsNote: "Interfaces were built by an external frontend developer to my specification and under my review.",
    live: "Live demo",
    code: "Code",
    skillsTitle: "Skills",
    skills: [
      { group: "Languages", items: ["Java", "C++", "SQL", "TypeScript (reading)"] },
      { group: "Backend", items: ["Spring Boot", "Spring Data JPA", "Spring Security", "REST APIs", "Flyway"] },
      { group: "Data", items: ["PostgreSQL", "H2", "CSV import/export"] },
      { group: "Quality", items: ["JUnit 5", "GoogleTest", "GitHub Actions", "Git"] },
      { group: "Domains", items: ["Procurement", "Accounting", "Approvals and budgets", "Contracts"] },
      { group: "Languages spoken", items: ["English C2", "German C1", "Russian native"] },
    ],
    contactTitle: "Let's talk",
    contactText: "I am looking for a working student or junior position in Java backend development in Vienna or remote.",
    footer: "© 2026 Boris Plotnikov",
  },
  de: {
    role: "Junior Java Developer · Werkstudent",
    hero: "Ich entwickle Backend-Systeme in Java und C++, die echte Geschäftsprobleme lösen.",
    intro: "Informatikstudent an der Universität Wien. Vor dem Studium habe ich sechs Jahre Einkauf und IT in einem Unternehmen geleitet — ich kenne also die Prozesse hinter der Software. Verfügbar bis zu 20 Stunden pro Woche.",
    ctaProjects: "Zu den Projekten",
    ctaContact: "Kontakt",
    pathTitle: "Mein Weg",
    path: [
      { years: "2017–2018", title: "Steuerbehörde", text: "Abteilungen Beschaffung und IT." },
      { years: "2019–2025", title: "Leiter Einkauf & IT-Manager", text: "Gastransportunternehmen: Einkauf, Verträge, Prozesskontrolle, Team von 3 Personen." },
      { years: "seit 2024", title: "BSc Informatik", text: "Universität Wien. Java, C++, Algorithmen, Datenbanken." },
      { years: "2026", title: "Portfolio-Projekte", text: "Fünf Systeme in Java und C++, alle live — jedes zeigt seinen eigenen Quellcode." },
    ],
    projectsTitle: "Projekte",
    projectsNote: "Die Oberflächen hat ein externer Frontend-Entwickler nach meiner Spezifikation und unter meiner Abnahme gebaut.",
    live: "Live-Demo",
    code: "Code",
    skillsTitle: "Kenntnisse",
    skills: [
      { group: "Programmiersprachen", items: ["Java", "C++", "SQL", "TypeScript (lesen)"] },
      { group: "Backend", items: ["Spring Boot", "Spring Data JPA", "Spring Security", "REST-APIs", "Flyway"] },
      { group: "Daten", items: ["PostgreSQL", "H2", "CSV-Import/Export"] },
      { group: "Qualität", items: ["JUnit 5", "GoogleTest", "GitHub Actions", "Git"] },
      { group: "Fachgebiete", items: ["Einkauf", "Buchhaltung", "Freigaben und Budgets", "Verträge"] },
      { group: "Sprachen", items: ["Englisch C2", "Deutsch C1", "Russisch Muttersprache"] },
    ],
    contactTitle: "Sprechen wir",
    contactText: "Ich suche eine Werkstudenten- oder Junior-Stelle in der Java-Backend-Entwicklung in Wien oder remote.",
    footer: "© 2026 Boris Plotnikov",
  },
};
