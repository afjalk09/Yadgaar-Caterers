import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  summary: string;
  effectiveDate: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, summary, effectiveDate, sections }: LegalPageProps) {
  return (
    <>
      <div className="pointer-events-none h-20" aria-hidden="true" />
      <main id="main-content" aria-labelledby="legal-title" className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="rounded hover:text-primary">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{title}</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-4xl">
            <header className="mb-12">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Legal</p>
              <h1 id="legal-title" className="font-serif text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
              <div className="mt-6 h-1 w-24 rounded-full bg-accent" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{summary}</p>
              <p className="mt-4 text-sm text-muted-foreground">Last updated: {effectiveDate}</p>
            </header>

            <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
              <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="On this page">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">On this page</h2>
                <ul className="space-y-2 text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="rounded text-muted-foreground hover:text-primary">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>

              <article className="space-y-10">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
                    <h2 id={`${section.id}-heading`} className="mb-4 font-serif text-2xl font-bold text-foreground">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-base leading-relaxed text-muted-foreground">{section.body}</div>
                  </section>
                ))}

                <div className="rounded-2xl border border-border bg-white p-6 text-sm text-muted-foreground">
                  <p>
                    This document is provided for review by a qualified legal professional before publication. Text marked
                    PLACEHOLDER must be replaced with verified business information.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
