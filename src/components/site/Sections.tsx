import Image from 'next/image';
import {
  Briefcase,
  Check,
  ChevronDown,
  Gift,
  HeartPulse,
  Home,
  KeyRound,
  Quote,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

import {
  about,
  commitment,
  faq,
  finalCta,
  hero,
  howItWorks,
  paths,
  personas,
  solutions,
  testimonials,
} from '@/content/site';
import { partners } from '@/content/partners';
import { cn } from '@/lib/utils';

import { Heading, Section, WaButton } from './ui';

const ICONS: Record<string, LucideIcon> = {
  heart: HeartPulse,
  home: Home,
  scale: Scale,
  key: KeyRound,
  trending: TrendingUp,
  users: Users,
  briefcase: Briefcase,
};

/* ───────────── 1. Hero ───────────── */
export function HeroSection() {
  return (
    <section id="hero" className="overflow-hidden bg-gradient-to-b from-[#f2f7fc] to-white">
      <div className="mx-auto grid max-w-container items-center gap-10 px-5 pb-14 pt-10 md:grid-cols-2 md:gap-14 md:px-8 md:pb-24 md:pt-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-rfg-dark/15 bg-white px-3 py-1 text-small font-semibold text-rfg-dark">
            <ShieldCheck aria-hidden="true" size={14} />
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[1.875rem] font-extrabold leading-[1.12] [text-wrap:balance] sm:text-[2.25rem] tracking-tight text-neutral-900 md:text-[3.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-body-lg text-neutral-600">{hero.sub}</p>
          <div className="mt-8 flex flex-col items-stretch gap-2 sm:items-start">
            <WaButton waKey={hero.cta.key} label={hero.cta.label} category="hero" />
            <span className="text-center text-caption text-neutral-500 sm:text-left">{hero.microcopy}</span>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-6">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[1.5rem] font-bold text-neutral-900 md:text-[1.875rem]">
                  {s.value}
                </dd>
                <dd className="text-small leading-snug text-neutral-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="absolute -inset-4 -z-0 rounded-[2rem] bg-rfg-light/10 blur-2xl" aria-hidden="true" />
          <Image
            src={hero.photo.src}
            alt={hero.photo.alt}
            width={hero.photo.width}
            height={hero.photo.height}
            priority
            sizes="(max-width: 768px) 90vw, 560px"
            className="relative aspect-square w-full rounded-[1.75rem] object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────── 2. Soluções ───────────── */
export function SolutionsSection() {
  return (
    <Section id="solucoes">
      <Heading eyebrow={solutions.eyebrow} title={solutions.headline} lead={solutions.lead} />
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.items.map((item) => {
          const Icon = ICONS[item.icon] ?? ShieldCheck;
          return (
            <li key={item.title} className="bg-white p-6 md:p-8">
              <Icon aria-hidden="true" size={24} className="text-rfg-dark" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-body-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-1 text-body-sm text-neutral-600">{item.text}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-8 text-center text-body text-neutral-600">{solutions.differential}</p>
    </Section>
  );
}

/* ───────────── 3. Para quem é ───────────── */
export function PersonasSection() {
  return (
    <Section id="para-quem" tone="soft">
      <Heading eyebrow={personas.eyebrow} title="Feito para quem tem muito a perder." />
      <ul className="grid gap-5 md:grid-cols-3">
        {personas.items.map((p) => {
          const Icon = ICONS[p.icon] ?? Users;
          return (
            <li key={p.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200/70 md:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-rfg-dark/10 text-rfg-dark">
                <Icon aria-hidden="true" size={20} />
              </span>
              <h3 className="mt-5 font-display text-h4 text-neutral-900">{p.title}</h3>
              <p className="mt-2 text-body-sm text-neutral-600">{p.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ───────────── 4. Como funciona ───────────── */
export function HowItWorksSection() {
  return (
    <Section id="como-funciona">
      <Heading eyebrow={howItWorks.eyebrow} title={howItWorks.headline} />
      <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
        {howItWorks.steps.map((s) => (
          <li key={s.n} className="border-t-2 border-rfg-dark pt-5">
            <span className="font-display text-small font-bold tracking-widest text-rfg-dark">{s.n}</span>
            <h3 className="mt-2 font-display text-h4 text-neutral-900">{s.title}</h3>
            <p className="mt-2 text-body-sm text-neutral-600">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ───────────── 5. Caminhos ───────────── */
export function PathsSection() {
  return (
    <Section id="caminhos" tone="soft">
      <Heading eyebrow={paths.eyebrow} title={paths.headline} lead={paths.sub} />
      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        {paths.items.map((p) => (
          <article
            key={p.slug}
            className={cn(
              'relative flex flex-col rounded-2xl bg-white p-6 ring-1 md:p-8',
              p.featured ? 'shadow-xl ring-2 ring-rfg-dark' : 'shadow-sm ring-neutral-200/70',
            )}
          >
            {p.featured ? (
              <span className="absolute -top-3 left-6 rounded-full bg-rfg-dark px-3 py-1 text-small font-semibold text-white">
                Mais procurado
              </span>
            ) : null}
            <h3 className="font-display text-h4 text-neutral-900">{p.title}</h3>
            <p className="mt-1 text-body-sm text-neutral-500">{p.forWho}</p>
            <ul className="mt-6 flex flex-col gap-2.5 text-body-sm text-neutral-700">
              {p.items.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-rfg-dark" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-neutral-50 p-4">
              <p className="flex items-center gap-2 text-small font-semibold uppercase tracking-wider text-rfg-dark">
                <Gift aria-hidden="true" size={14} /> Bônus
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 text-caption text-neutral-600">
                {p.bonus.map((b) => (
                  <li key={b} className="flex gap-2 [text-wrap:pretty]">
                    <span aria-hidden="true" className="text-rfg-dark">+</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <WaButton
              waKey={p.key}
              label={p.cta}
              category="secao_9"
              variant={p.featured ? 'primary' : 'outline'}
              className="mt-6 w-full"
            />
          </article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-body-sm text-neutral-500">{paths.investment}</p>
      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center ring-1 ring-neutral-200/70 md:p-10">
        <h3 className="font-display text-h4 text-neutral-900">{paths.unsure.title}</h3>
        <p className="max-w-xl text-body-sm text-neutral-600">{paths.unsure.text}</p>
        <WaButton waKey={paths.unsure.key} label={paths.unsure.cta} category="secao_9" />
      </div>
    </Section>
  );
}

/* ───────────── 6. Sobre + prova ───────────── */
export function AboutSection() {
  return (
    <Section id="sobre" tone="dark">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Heading eyebrow={about.eyebrow} title={about.headline} dark />
          <ol className="flex flex-col gap-6">
            {about.timeline.map((t) => (
              <li key={t.year} className="grid grid-cols-[4.5rem_1fr] gap-4">
                <span className="font-display text-h4 font-bold text-rfg-light">{t.year}</span>
                <p className="text-body-sm text-white/75">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <Image
          src={about.photo.src}
          alt={about.photo.alt}
          width={about.photo.width}
          height={about.photo.height}
          loading="lazy"
          sizes="(max-width: 768px) 90vw, 560px"
          className="w-full rounded-2xl object-cover"
        />
      </div>

      <div id="depoimentos" className="mt-20">
        <Heading eyebrow={testimonials.eyebrow} title={testimonials.headline} dark />
        <ul className="grid gap-5 md:grid-cols-2">
          {testimonials.items.map((t) => (
            <li key={t.name} className="flex flex-col rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-7">
              <Quote aria-hidden="true" size={22} className="text-rfg-light" />
              <details className="group mt-3">
                <summary className="cursor-pointer list-none text-body text-white/90 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">{t.excerpt}</span>
                  <span className="mt-2 block text-caption font-semibold text-rfg-light group-open:hidden">
                    Ler depoimento completo
                  </span>
                  <span className="hidden text-caption font-semibold text-rfg-light group-open:block">Recolher</span>
                </summary>
                <p className="mt-2 text-body-sm text-white/80">{t.full}</p>
              </details>
              <p className="mt-auto pt-5 text-body-sm">
                <strong className="font-semibold text-white">{t.name}</strong>
                <span className="block text-white/50">{t.role}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <p className="mb-6 text-center text-small font-semibold uppercase tracking-[0.16em] text-white/50">
          Seguradoras parceiras
        </p>
        <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {partners.map((p) => (
            <li key={p.slug} className="grid h-16 place-items-center rounded-xl bg-white px-4">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading="lazy"
                unoptimized={p.src.endsWith('.svg')}
                className="max-h-8 w-auto max-w-[110px] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ───────────── 7. Compromisso ───────────── */
export function CommitmentSection() {
  return (
    <Section id="compromisso">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-small font-semibold uppercase tracking-[0.16em] text-rfg-dark">{commitment.eyebrow}</p>
        <h2 className="font-display text-[1.75rem] font-bold leading-tight tracking-tight text-neutral-900 md:text-[2.5rem]">
          {commitment.headline}
        </h2>
        <ul className="mt-8 flex flex-col items-center gap-3 text-body text-neutral-700 md:flex-row md:justify-center md:gap-8">
          {commitment.points.map((p) => (
            <li key={p} className="flex items-center gap-2 text-left">
              <Check aria-hidden="true" size={18} className="shrink-0 text-rfg-dark" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ───────────── 8. FAQ ───────────── */
export function FaqSection() {
  return (
    <Section id="faq" tone="soft">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Heading eyebrow={faq.eyebrow} title={faq.headline} />
        <div className="divide-y divide-neutral-200 rounded-2xl bg-white px-6 ring-1 ring-neutral-200/70">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-body font-semibold text-neutral-900 [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-neutral-400 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-body-sm text-neutral-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────────── 9. CTA final ───────────── */
export function FinalCtaSection() {
  return (
    <section className="bg-rfg-dark">
      <div className="mx-auto flex max-w-container flex-col items-center gap-5 px-5 py-16 text-center md:px-8 md:py-20">
        <h2 className="max-w-2xl font-display text-[1.75rem] font-bold leading-tight text-white md:text-[2.25rem]">
          {finalCta.headline}
        </h2>
        <p className="text-body text-white/80">{finalCta.text}</p>
        <WaButton waKey={finalCta.key} label={finalCta.cta} category="faq" variant="light" />
      </div>
    </section>
  );
}
