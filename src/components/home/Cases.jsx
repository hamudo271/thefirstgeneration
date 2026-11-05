import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { fadeInUp, stagger, SectionHeader, TextLink } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Case showcase — horizontal snap carousel of real videos. `onPlay` opens the
// shared lightbox.
const Cases = ({ onPlay }) => {
  const { cases } = useContent('home');
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scroll = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrowCls = (disabled) =>
    `flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
      disabled
        ? 'cursor-default border-border-primary text-text-secondary/35'
        : 'border-border-primary bg-bg-elevated text-text-primary hover:border-text-primary'
    }`;

  return (
    <section className="overflow-hidden bg-surface-muted py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          split
          eyebrow={cases.eyebrow}
          headline={cases.headline}
          accent={cases.accent}
          subhead={cases.subhead}
          action={
            <div className="flex items-center justify-between gap-6 lg:justify-start">
              <TextLink to={cases.morePath}>{cases.moreLabel}</TextLink>
              <div className="flex gap-2">
                <button onClick={() => scroll(-1)} disabled={edge.start} aria-label="이전 사례" className={arrowCls(edge.start)}>
                  <ChevronLeft size={19} />
                </button>
                <button onClick={() => scroll(1)} disabled={edge.end} aria-label="다음 사례" className={arrowCls(edge.end)}>
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
          }
        />
      </div>

      {/* Track — bleeds to the right edge, aligned to the container on the left */}
      <motion.div
        ref={track}
        onScroll={update}
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [padding-inline:max(1.5rem,calc((100vw-80rem)/2+1.5rem))] [scroll-padding-inline:max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        {cases.items.map((c, i) => (
          <motion.article
            key={c.videoId + i}
            data-card
            variants={fadeInUp}
            className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((80rem-3rem-2.5rem)/3)]"
          >
            <button
              onClick={() => onPlay(c.videoId)}
              className="group block w-full text-left"
              aria-label={`${c.title || c.tag} — ${cases.playLabel}`}
            >
              <div className="rounded-[28px] bg-bg-elevated p-3 shadow-[var(--shadow-card)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${c.videoId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-primary">
                    <Play size={20} className="ml-0.5 fill-white text-white" />
                  </span>
                </div>
              </div>
              <div className="px-2 pt-5">
                <p className="text-sm text-text-secondary">
                  {[c.creator, c.tag].filter(Boolean).join(' · ')}
                </p>
                {c.title && (
                  <h3 className="mt-1.5 line-clamp-1 text-lg font-bold tracking-tight text-text-primary transition-colors group-hover:text-accent-secondary">
                    {c.title}
                  </h3>
                )}
                <span className="mt-3 inline-block border-b border-text-primary pb-0.5 text-sm font-bold text-text-primary">
                  {cases.playLabel}
                </span>
              </div>
            </button>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Cases;
