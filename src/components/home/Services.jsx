import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fadeInUp, stagger, SectionHeader, TextLink } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Services — 2×2 cards. Sourced from serviceDetail.services so cards stay in
// sync with the Service Detail pages they link to.
const Services = () => {
  const { services } = useContent('serviceDetail');
  const { servicesIntro: intro } = useContent('home');
  const items = services.items;
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          split
          eyebrow={intro.eyebrow}
          headline={intro.headline}
          accent={intro.accent}
          subhead={intro.subhead}
          action={<TextLink to="/service">{intro.moreLabel}</TextLink>}
        />
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {items.map((s, i) => (
            <motion.div key={s.id} variants={fadeInUp}>
              <Link
                to={`/service/${s.id}`}
                className="card-surface group flex h-full flex-col overflow-hidden rounded-[28px] p-3"
              >
                <div className="flex items-start justify-between gap-6 px-5 pb-6 pt-6 md:px-6 md:pt-7">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-secondary">
                      {String(i + 1).padStart(2, '0')} · {s.subtitle}
                    </span>
                    <h3 className="mt-2.5 text-2xl font-black tracking-tight text-text-primary md:text-[1.7rem]">{s.title}</h3>
                    <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-text-secondary">{s.desc}</p>
                  </div>
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-primary text-text-primary transition-all duration-300 group-hover:border-transparent group-hover:bg-accent-primary group-hover:text-accent-ink">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <div className="relative mt-auto aspect-[16/8] overflow-hidden rounded-[20px] bg-surface-muted">
                  <img
                    src={s.heroImage} alt={s.title} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-text-primary backdrop-blur">
                    {intro.detailLabel}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
