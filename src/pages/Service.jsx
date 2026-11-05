import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X, ArrowUpRight, ClipboardList, Camera, Scissors, Music, Captions, Highlighter, Palette,
  Image as ImageIcon, Smartphone, Upload, Users, Activity, Circle,
} from 'lucide-react';
import SEO from '../components/SEO';
import { PageHero, SectionHeader, CTABand, Eyebrow, Accented, fadeInUp, stagger } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

// Quick links to the four service detail pages, right under the hero.
const ServiceIndex = () => {
  const { services } = useContent('serviceDetail');
  return (
    <motion.div
      variants={stagger} initial="hidden" animate="visible"
      className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-20 lg:grid-cols-4"
    >
      {services.items.map((s, i) => (
        <motion.div key={s.id} variants={fadeInUp}>
          <Link
            to={`/service/${s.id}`}
            className="card-surface group flex h-full items-center gap-4 rounded-[22px] p-3 pr-5"
          >
            <span className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-surface-muted">
              <img src={s.heroImage} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold text-accent-secondary">{String(i + 1).padStart(2, '0')}</span>
              <span className="block truncate text-[15px] font-bold text-text-primary">{s.title}</span>
            </span>
            <ArrowUpRight size={18} className="shrink-0 text-text-secondary transition-colors group-hover:text-accent-primary" />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

const FailureSection = () => {
  const { failure } = useContent('service');
  return (
    <section className="bg-surface-muted py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader split eyebrow={failure.eyebrow} headline={failure.headline} accent="실패" subhead={failure.subhead} />
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {failure.reasons.map((reason, i) => (
            <motion.div key={i} variants={fadeInUp} className="card-surface rounded-[28px] p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <X size={20} strokeWidth={2.6} />
                </span>
                <span className="text-sm font-black text-text-primary/20">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-7 text-2xl font-black tracking-tight text-text-primary">{reason.title}</h3>
              <p className="mt-3 leading-[1.85] text-text-secondary">{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Icon per scope item (content keys → line icons).
const SCOPE_ICONS = {
  plan: ClipboardList, camera: Camera, cut: Scissors, music: Music, caption: Captions, highlight: Highlighter,
  color: Palette, thumbnail: ImageIcon, shorts: Smartphone, upload: Upload, influencer: Users, consulting: Activity,
};

// What's included, as a numbered icon-tile grid.
const ScopeSection = () => {
  const { scope } = useContent('service');
  if (!scope?.items?.length) return null;
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader split eyebrow={scope.eyebrow} headline={scope.headline} accent={scope.accent} subhead={scope.subhead} />
        <motion.ul
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-9 md:grid-cols-4 md:gap-x-5 lg:grid-cols-6"
        >
          {scope.items.map((item, i) => {
            const Icon = SCOPE_ICONS[item.icon] || Circle;
            return (
              <motion.li
                key={item.label} variants={fadeInUp}
                className="group flex flex-row-reverse items-center justify-end gap-3 rounded-2xl border border-border-primary p-2 pr-3 sm:block sm:rounded-none sm:border-0 sm:p-0"
              >
                <p className="min-w-0 text-[13px] font-bold leading-snug tracking-tight text-text-primary sm:mb-3 sm:truncate sm:text-[15px]">
                  <span className="tabular-nums text-accent-secondary">{String(i + 1).padStart(2, '0')}.</span> {item.label}
                </p>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-muted transition-all duration-500 group-hover:bg-accent-primary/[0.12] sm:aspect-[1/0.86] sm:h-auto sm:w-auto sm:rounded-[26px] sm:group-hover:-translate-y-1">
                  <Icon
                    size={38}
                    strokeWidth={1.5}
                    className="h-6 w-6 text-text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-accent-secondary sm:h-[38px] sm:w-[38px]"
                    aria-hidden
                  />
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

const PrinciplesSection = () => {
  const { principles } = useContent('service');
  return (
    <section className="bg-surface-muted py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader split eyebrow={principles.eyebrow} headline={principles.headline} accent="중요" subhead={principles.subhead} />
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 border-t border-border-primary md:grid-cols-2"
        >
          {principles.items.map((item, i) => (
            <motion.div
              key={i} variants={fadeInUp}
              className={`group flex gap-6 border-b border-border-primary py-9 md:py-11 ${i % 2 === 0 ? 'md:pr-12' : 'md:border-l md:pl-12'}`}
            >
              <span className="text-gradient text-5xl font-black leading-none tracking-tight md:text-6xl">{item.num}</span>
              <div>
                <h3 className="text-xl font-black tracking-tight text-text-primary transition-colors group-hover:text-accent-secondary md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 leading-[1.85] text-text-secondary">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const { process } = useContent('service');
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:sticky lg:top-28">
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <h2 className="mt-5 whitespace-pre-line text-[2rem] font-black leading-[1.12] tracking-[-0.03em] text-text-primary md:text-5xl">
              <Accented text={process.headline} accent="프로세스" />
            </h2>
          </motion.div>
        </div>
        <motion.ol
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-3 lg:col-span-8"
        >
          {process.steps.map((item, i) => (
            <motion.li key={i} variants={fadeInUp} className="card-surface flex gap-5 rounded-[24px] p-6 md:gap-7 md:p-7">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                  i % 2 === 0 ? 'bg-brand-gradient' : 'bg-text-primary text-white'
                }`}
              >
                {item.step}
              </span>
              <div>
                <h3 className="text-lg font-black tracking-tight text-text-primary md:text-xl">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-text-secondary">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

const Service = () => {
  const { seo, hero } = useContent('service');
  const { finalCta } = useContent('home');
  const { footer } = useContent('global');
  return (
    <div className="bg-bg-primary">
      <SEO title={seo.title} description={seo.description} path="/service" />
      <PageHero
        eyebrow={hero.eyebrow}
        title={`${hero.headlineLine1}\n${hero.headlineLine2}`}
        accent={hero.headlineLine2}
        subhead={hero.subhead}
      >
        <ServiceIndex />
      </PageHero>
      <FailureSection />
      <ScopeSection />
      <PrinciplesSection />
      <ProcessSection />
      <CTABand
        eyebrow={finalCta.eyebrow}
        headline={finalCta.headline}
        subhead={finalCta.closing}
        button={finalCta.button}
        secondary={footer?.ctaSecondary}
        secondaryTo={footer?.ctaSecondaryPath}
      />
    </div>
  );
};

export default Service;
