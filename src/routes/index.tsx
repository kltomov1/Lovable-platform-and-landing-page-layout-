import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Course Name — Automate your work with AI in 6 weeks" },
      { name: "description", content: "A 6-week online course to learn to automate your work with AI." },
      { property: "og:title", content: "Course Name — Automate your work with AI" },
      { property: "og:description", content: "Learn to automate your work with AI in 6 weeks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const btn = "inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90";
const card = "rounded-lg border bg-card/60 p-7";

function Section({ id, eyebrow, title, accent, children }: { id?: string; eyebrow: string; title: string; accent?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
        {title} {accent && <span className="font-serif font-normal italic text-muted-foreground">{accent}</span>}
      </h2>
      <div className="mt-14">{children}</div>
    </section>
  );
}

const modules = ["Foundations of AI tools", "Prompting that actually works", "Automating email & documents", "No-code workflows", "Building your own assistants", "Your automation system"];
const faqs = [
  ["Do I need technical experience?", "No. Placeholder answer explaining the course starts from zero."],
  ["How much time per week?", "Around 3–4 hours. Placeholder answer."],
  ["Is it live or recorded?", "Placeholder answer about the format."],
  ["Do I get a certificate?", "Placeholder answer about certification."],
  ["What if it's not for me?", "Placeholder answer about the refund policy."],
];

function Index() {
  return (
    <main className="overflow-x-hidden">
      <header className="relative">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <span className="font-bold tracking-tight">Course Name</span>
          <div className="flex items-center gap-6"><Link to="/find-your-edge" search={{ slide: 1, print: false }} className="text-sm text-muted-foreground hover:text-foreground">Find Your Edge</Link><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></div>
        </nav>
        <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-20 text-center md:pt-32">
          <p className="mx-auto w-fit rounded-full border px-4 py-1.5 text-xs text-muted-foreground">6-week online course · Next cohort starts soon</p>
          <h1 className="mt-8 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-8xl">
            Automate your work
            <span className="block font-serif font-normal italic text-primary">with AI, in six weeks.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">Placeholder subline: a practical course that turns hours of repetitive work into minutes.</p>
          <a href="#pricing" className={`${btn} mt-10`}>Join the course</a>
        </div>
      </header>

      <Section eyebrow="Who it's for" title="Built for people" accent="who value their time.">
        <div className="grid gap-5 md:grid-cols-3">
          {["Professionals", "Founders", "Teams"].map((t) => (
            <div key={t} className={card}>
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Placeholder description of why this course fits this group.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="What you'll learn" title="Six modules," accent="one clear path.">
        <ol className="divide-y border-y">
          {modules.map((m, i) => (
            <li key={m} className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-10">
              <span className="font-serif text-xl italic text-primary">0{i + 1}</span>
              <span className="text-xl font-semibold md:w-80">{m}</span>
              <span className="text-sm text-muted-foreground">Placeholder summary of the module content.</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="How it works" title="Simple by" accent="design.">
        <div className="grid gap-5 md:grid-cols-3">
          {["Enroll", "Learn weekly", "Automate"].map((t, i) => (
            <div key={t} className={card}>
              <span className="font-serif text-4xl italic text-primary">{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">Placeholder description of this step.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Your instructor" title="Meet" accent="Instructor Name.">
        <div className="grid items-center gap-10 md:grid-cols-[320px_1fr]">
          <div className="flex aspect-[4/5] items-center justify-center rounded-lg border bg-card text-sm text-muted-foreground">Photo placeholder</div>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Placeholder bio: years of experience, notable work and why they teach this course.</p>
            <p>Second placeholder paragraph with a personal note.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Testimonials" title="What students" accent="say.">
        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <figure key={n} className={card}>
              <blockquote className="font-serif text-xl italic leading-snug">"Placeholder testimonial about the course experience."</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">Student Name {n} · Role</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="pricing" eyebrow="Pricing" title="One plan." accent="Everything included.">
        <div className="mx-auto max-w-md rounded-lg border border-primary/40 bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">Full course</p>
          <p className="mt-4 text-6xl font-extrabold tracking-tight">2 490 <span className="text-2xl font-semibold text-muted-foreground">SEK</span></p>
          <ul className="mt-8 space-y-3 text-left text-sm text-muted-foreground">
            {["6 modules + exercises", "Weekly live Q&A", "Community access", "Lifetime updates"].map((f) => (
              <li key={f} className="flex gap-3"><span className="text-primary">✓</span>{f}</li>
            ))}
          </ul>
          <a href="#" className={`${btn} mt-10 w-full`}>Join the course</a>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Questions," accent="answered.">
        <div className="divide-y border-y">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none justify-between text-lg font-semibold">
                {q}<span className="text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="relative px-6 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <h2 className="relative text-4xl font-extrabold tracking-tight md:text-7xl">
          Ready to begin?<span className="block font-serif font-normal italic text-primary">Your time is waiting.</span>
        </h2>
        <a href="#pricing" className={`${btn} relative mt-10`}>Join the course</a>
      </section>

      <footer className="border-t px-6 py-8 text-center text-xs text-muted-foreground">© 2026 Course Name</footer>
    </main>
  );
}
