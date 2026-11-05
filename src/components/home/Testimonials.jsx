import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeader } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Testimonials (paged, 3 per page)
const Testimonials = () => {
  const { testimonials } = useContent('home');
  const items = testimonials.items;
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(items.length / perPage);
  const shown = items.slice(page * perPage, page * perPage + perPage);

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full border border-border-primary bg-bg-elevated text-text-primary transition-colors hover:border-text-primary';

  return (
    <section className="relative overflow-hidden bg-surface-muted py-24 md:py-32">
      <div className="glow-accent absolute inset-0 opacity-60" style={{ '--gx': '85%', '--gy': '-10%' }} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          split
          eyebrow={testimonials.eyebrow}
          headline={testimonials.headline}
          accent={testimonials.accent}
          action={
            pages > 1 && (
              <div className="flex items-center gap-4 lg:justify-end">
                <span className="text-sm font-bold tabular-nums text-text-primary">
                  {String(page + 1).padStart(2, '0')}
                  <span className="text-text-secondary/60"> / {String(pages).padStart(2, '0')}</span>
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => (p - 1 + pages) % pages)} aria-label="이전 후기" className={arrow}>
                    <ChevronLeft size={19} />
                  </button>
                  <button onClick={() => setPage((p) => (p + 1) % pages)} aria-label="다음 후기" className={arrow}>
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            )
          }
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <AnimatePresence mode="wait">
            {shown.map((t, i) => (
              <motion.figure
                key={page + '-' + i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-surface flex flex-col rounded-[28px] p-8"
              >
                <Quote size={30} className="fill-accent-primary/15 text-accent-primary" aria-hidden />
                <blockquote className="mt-5 flex-1 text-[15px] leading-[1.8] text-text-primary/80">{t.body}</blockquote>
                <figcaption className="mt-8 flex items-center justify-between border-t border-border-primary pt-5">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/12 text-sm font-black text-accent-secondary">
                      {t.name.charAt(0)}
                    </span>
                    <span className="font-bold text-text-primary">{t.name}</span>
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-400" aria-label={`평점 ${t.rating.toFixed(1)}`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} className="fill-amber-400" />
                    ))}
                    <span className="ml-1.5 text-xs font-bold text-text-secondary">{t.rating.toFixed(1)}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
