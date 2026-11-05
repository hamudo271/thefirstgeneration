import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, CalendarClock, Check, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import { PageHero, CTABand, ButtonLink, fadeInUp, stagger } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

const scrollToId = (id) => (e) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  if (window.lenis) window.lenis.scrollTo(el, { offset: -90 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

// Feature-by-package matrix. Rows = every feature that appears in the section
// (first-seen order) plus staff/period; cells = included or not.
const CompareTable = ({ packages, labels, compare }) => {
  const features = [...new Set(packages.flatMap((p) => p.features.map((f) => f.value)))];
  const has = (pkg, f) => pkg.features.some((x) => x.value === f);
  const meta = [
    [labels.staffLabel.replace(/:\s*$/, ''), (p) => p.staff],
    [labels.periodLabel.replace(/:\s*$/, ''), (p) => p.period],
  ].filter(([, get]) => packages.some(get));
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
      className="mt-6 overflow-hidden rounded-[28px] border border-border-primary bg-bg-elevated"
    >
      <p className="flex items-center justify-between gap-4 border-b border-border-primary px-6 py-4 text-sm font-black text-text-primary md:px-8">
        {compare.title}
        {compare.swipeHint && <span className="text-xs font-semibold text-text-secondary md:hidden">{compare.swipeHint} →</span>}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-bg-elevated to-transparent md:hidden" aria-hidden />
        <div className="no-scrollbar overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface-muted">
                <th scope="col" className="sticky left-0 z-10 w-[34%] bg-surface-muted px-6 py-4 text-left text-xs font-bold text-text-secondary md:px-8">
                  {compare.featureLabel}
                </th>
                {packages.map((p) => (
                  <th key={p.title} scope="col" className="px-4 py-4 text-center text-[13px] font-black leading-snug text-text-primary">
                    {p.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meta.map(([label, get]) => (
                <tr key={label} className="border-t border-border-primary">
                  <th scope="row" className="sticky left-0 z-10 bg-bg-elevated px-6 py-3.5 text-left font-semibold text-text-primary md:px-8">{label}</th>
                  {packages.map((p) => (
                    <td key={p.title} className="px-4 py-3.5 text-center text-[13px] leading-snug text-text-secondary">{get(p) || '—'}</td>
                  ))}
                </tr>
              ))}
              {features.map((f) => (
                <tr key={f} className="border-t border-border-primary transition-colors hover:bg-surface-muted/60">
                  <th scope="row" className="sticky left-0 z-10 bg-bg-elevated px-6 py-3.5 text-left font-medium text-text-primary md:px-8">{f}</th>
                  {packages.map((p) => (
                    <td key={p.title} className="px-4 py-3.5 text-center">
                      {has(p, f) ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary/15 text-accent-secondary">
                          <Check size={14} strokeWidth={3} />
                          <span className="sr-only">{compare.included}</span>
                        </span>
                      ) : (
                        <span className="inline-flex h-6 w-6 items-center justify-center text-text-secondary/35">
                          <Minus size={14} />
                          <span className="sr-only">{compare.excluded}</span>
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const PackageGrid = ({ id, index, title, sectionLabels, packages, inquiryLabel, compare }) => (
  <div id={id} className="scroll-mt-28">
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
      className="mb-8 flex items-baseline gap-4 border-b border-border-primary pb-5"
    >
      <span className="text-sm font-black tabular-nums text-accent-secondary">{String(index).padStart(2, '0')}</span>
      <h2 className="text-2xl font-black tracking-tight text-text-primary md:text-[2rem]">{title}</h2>
    </motion.div>
    <motion.div
      variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="grid grid-cols-1 gap-5 md:grid-cols-3"
    >
      {packages.map((pkg, i) => (
        <motion.div key={i} variants={fadeInUp} className="card-surface flex flex-col rounded-[28px] p-7 md:p-8">
          <h3 className="text-xl font-black tracking-tight text-text-primary md:text-2xl">{pkg.title}</h3>
          {(pkg.staff || pkg.period) && (
            <dl className="mt-6 grid grid-cols-2 gap-2">
              {pkg.staff && (
                <div className="rounded-2xl bg-surface-muted px-4 py-3">
                  <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <Users size={13} /> {sectionLabels.staffLabel.replace(/:\s*$/, '')}
                  </dt>
                  <dd className="mt-1 text-[15px] font-bold text-text-primary">{pkg.staff}</dd>
                </div>
              )}
              {pkg.period && (
                <div className="rounded-2xl bg-surface-muted px-4 py-3">
                  <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <CalendarClock size={13} /> {sectionLabels.periodLabel.replace(/:\s*$/, '')}
                  </dt>
                  <dd className="mt-1 text-[15px] font-bold text-text-primary">{pkg.period}</dd>
                </div>
              )}
            </dl>
          )}
          <ul className="mb-8 mt-6 flex-1 space-y-2.5">
            {pkg.features.map((feat, j) => (
              <li key={j} className="flex items-start gap-2.5 text-[15px] text-text-secondary">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-primary" />
                {feat.value}
              </li>
            ))}
          </ul>
          {inquiryLabel && (
            <ButtonLink to="/contact" variant="outline" className="w-full justify-between">{inquiryLabel}</ButtonLink>
          )}
        </motion.div>
      ))}
    </motion.div>
    {compare && packages.length > 1 && packages.every((p) => p.staff || p.period) && (
      <CompareTable packages={packages} labels={sectionLabels} compare={compare} />
    )}
  </div>
);

const Pricing = () => {
  const { seo, hero, videoSection, shortformSection, otherSection, compare } = useContent('pricing');
  const { shared } = useContent('serviceDetail');
  const labels = { staffLabel: videoSection.staffLabel, periodLabel: videoSection.periodLabel };

  const sections = [
    { id: 'youtube', ...videoSection },
    { id: 'shortform', ...shortformSection },
    ...(otherSection?.packages?.length > 0 ? [{ id: 'other', ...otherSection }] : []),
  ];

  return (
    <div className="bg-bg-primary">
      <SEO title={seo.title} description={seo.description} path="/pricing" />

      <PageHero eyebrow={hero.eyebrow} title={hero.headline} accent="가격" subhead={hero.subhead}>
        <nav className="mt-12 flex flex-wrap gap-2 md:mt-16" aria-label="패키지 바로가기">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={scrollToId(s.id)}
              className="rounded-full border border-border-primary bg-bg-elevated px-5 py-2.5 text-sm font-bold text-text-primary transition-colors hover:border-text-primary"
            >
              <span className="mr-2 text-accent-secondary">{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="bg-surface-muted py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-20 px-6 md:space-y-24">
          {sections.map((s, i) => (
            <PackageGrid
              key={s.id}
              id={s.id}
              index={i + 1}
              title={s.title}
              sectionLabels={labels}
              packages={s.packages}
              inquiryLabel={shared?.inquiryButton}
              compare={compare}
            />
          ))}
        </div>
      </section>

      <CTABand
        headline={'어떤 패키지가 맞을지\n고민되시나요?'}
        subhead="목표와 예산을 알려주시면, 가장 효율적인 구성을 제안해 드립니다."
        button="맞춤 견적 문의"
      />
    </div>
  );
};

export default Pricing;
