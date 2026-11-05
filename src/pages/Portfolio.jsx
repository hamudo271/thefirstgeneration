import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import SEO from '../components/SEO';
import { PageHero, CTABand, VideoLightbox } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

const ALL = '전체';

const Portfolio = () => {
  const { seo, hero, filters, projects } = useContent('portfolio');
  const { finalCta } = useContent('home');
  const [filter, setFilter] = useState(ALL);
  const [video, setVideo] = useState(null);

  const items = projects.items;
  const filtered = filter === ALL ? items : items.filter((p) => p.category === filter);
  const countOf = (name) => (name === ALL ? items.length : items.filter((p) => p.category === name).length);

  return (
    <div className="bg-bg-primary">
      <SEO title={seo.title} description={seo.description} path="/portfolio" />

      <PageHero eyebrow={hero.eyebrow} title={hero.headline} accent="불여일견" subhead={hero.subhead} />

      <section className="bg-surface-muted pb-24 pt-14 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filters */}
          <div className="no-scrollbar -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="카테고리">
            {filters.items.map((item) => {
              const on = filter === item.name;
              return (
                <button
                  key={item.name}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(item.name)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                    on
                      ? 'bg-text-primary text-white shadow-[0_10px_24px_-12px_rgba(11,16,32,0.7)]'
                      : 'border border-border-primary bg-bg-elevated text-text-secondary hover:border-text-primary hover:text-text-primary'
                  }`}
                >
                  {item.name}
                  <span className={`text-xs tabular-nums ${on ? 'text-accent-soft' : 'text-text-secondary/60'}`}>{countOf(item.name)}</span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.button
                  layout
                  key={project.videoId}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setVideo(project.videoId)}
                  className="group block text-left"
                >
                  <div className="rounded-[28px] bg-bg-elevated p-3 shadow-[var(--shadow-card)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]">
                    <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black">
                      <img
                        src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                        alt={project.title ? `${project.title} — ${project.creator ?? ''}`.trim() : ''}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                        {project.category}
                      </span>
                      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-primary">
                        <Play size={20} className="ml-0.5 fill-white text-white" />
                      </span>
                    </div>
                  </div>
                  {project.title && (
                    <div className="px-2 pt-5">
                      {project.creator && <p className="text-sm text-text-secondary">{project.creator}</p>}
                      <h3 className="mt-1.5 text-lg font-bold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent-secondary">
                        {project.title}
                      </h3>
                      {project.desc && <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-text-secondary">{project.desc}</p>}
                    </div>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTABand
        eyebrow={finalCta.eyebrow}
        headline={finalCta.headline}
        subhead={finalCta.closing}
        button={finalCta.button}
      />

      <VideoLightbox videoId={video} onClose={() => setVideo(null)} />
    </div>
  );
};

export default Portfolio;
