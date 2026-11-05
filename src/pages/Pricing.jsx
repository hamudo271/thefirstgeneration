import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, CalendarClock } from 'lucide-react';
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

const PackageGrid = ({ id, index, title, sectionLabels, packages, inquiryLabel }) => (
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
  </div>
);

const Pricing = () => {
  const { seo, hero, videoSection, shortformSection, otherSection } = useContent('pricing');
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
