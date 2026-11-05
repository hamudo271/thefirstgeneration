import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, FileText, Scissors, Smartphone } from 'lucide-react';
import { SectionHeader, Chip, fadeInUp, stagger, EASE_STANDARD } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// ── Mini visuals, one per step (decorative) ─────────────────────────────

// 1 — channel plan document with data tags
const PlanVisual = () => (
  <div className="relative mx-auto w-[78%] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(11,16,32,0.45)]">
    <div className="mb-3 flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary/12 text-accent-secondary">
        <FileText size={14} />
      </span>
      <span className="h-2 w-24 rounded-full bg-text-primary/80" />
    </div>
    <div className="space-y-2">
      <span className="block h-1.5 w-full rounded-full bg-border-primary" />
      <span className="block h-1.5 w-5/6 rounded-full bg-border-primary" />
      <span className="block h-1.5 w-2/3 rounded-full bg-border-primary" />
    </div>
    <div className="mt-4 flex flex-wrap gap-1.5">
      {['데이터 분석', '소재 발굴', '원스톱'].map((t) => (
        <span key={t} className="rounded-full bg-accent-primary px-2.5 py-1 text-[10px] font-bold text-accent-ink">✓ {t}</span>
      ))}
    </div>
  </div>
);

// 2 — rising probability bars
const ProbabilityVisual = () => {
  const reduce = useReducedMotion();
  const bars = [30, 44, 38, 58, 72, 66, 92];
  return (
    <div className="mx-auto flex h-28 w-[78%] items-end gap-2 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(11,16,32,0.45)]">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={`block flex-1 origin-bottom rounded-md ${i === bars.length - 1 ? 'bg-brand-gradient' : 'bg-accent-primary/25'}`}
          style={{ height: `${h}%` }}
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: EASE_STANDARD }}
        />
      ))}
    </div>
  );
};

// 3 — editing timeline tracks
const EditVisual = () => (
  <div className="mx-auto w-[82%] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(11,16,32,0.45)]">
    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold text-text-secondary">
      <Scissors size={13} className="text-accent-secondary" /> 00:12:08
    </div>
    {[
      [18, 26, 14, 30],
      [30, 12, 22, 24],
      [10, 40, 20, 18],
    ].map((row, r) => (
      <div key={r} className="mb-1.5 flex gap-1">
        {row.map((w, i) => (
          <span
            key={i}
            style={{ width: `${w}%` }}
            className={`h-3 rounded ${r === 0 ? 'bg-accent-primary/70' : r === 1 ? 'bg-text-primary/70' : 'bg-accent-primary/25'}`}
          />
        ))}
      </div>
    ))}
    <span className="relative mt-2 block h-px bg-border-primary">
      <span className="absolute -top-1.5 left-[46%] h-4 w-0.5 rounded bg-red-500" />
    </span>
  </div>
);

// 4 — one long video becomes several shorts
const ShortsVisual = () => (
  <div className="mx-auto flex w-[82%] items-center justify-center gap-2.5">
    <span className="flex aspect-video w-[44%] items-center justify-center rounded-xl bg-text-primary text-[10px] font-bold text-white/70">LONG</span>
    <span className="text-lg font-black text-accent-secondary">→</span>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="flex aspect-[9/16] w-[13%] items-end justify-center rounded-lg bg-brand-gradient pb-1 shadow-[0_12px_24px_-14px_rgba(234,164,0,0.9)]"
      >
        <Smartphone size={10} />
      </span>
    ))}
  </div>
);

// 5 — limited monthly slots (live from the scarcity settings)
const QuotaVisual = () => {
  const { scarcity } = useContent('home');
  const total = scarcity?.monthlyTotal ?? 20;
  const left = Math.min(total, scarcity?.remainingCount ?? 0);
  return (
    <div className="mx-auto w-[80%] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(11,16,32,0.45)]">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-[11px] font-bold text-text-secondary">{scarcity?.remainingLabel}</span>
        <span className="text-sm font-black text-accent-secondary">
          {left}{scarcity?.remainingUnit}
          <span className="text-text-secondary"> / {total}</span>
        </span>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`aspect-square rounded-[4px] ${i < total - left ? 'bg-accent-primary' : 'bg-border-primary'}`} />
        ))}
      </div>
    </div>
  );
};

const VISUALS = [PlanVisual, ProbabilityVisual, EditVisual, ShortsVisual, QuotaVisual];
// Bento spans on a 6-col grid: two wide cards, then three.
const SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

// Growth steps — bento of five cards
const Growth = () => {
  const { growth } = useContent('home');
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader split eyebrow={growth.eyebrow} headline={growth.headline} accent="성장" subhead={growth.subhead} />
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6"
        >
          {growth.steps.map((item, i) => {
            const Visual = VISUALS[i % VISUALS.length];
            return (
              <motion.article
                key={item.step}
                variants={fadeInUp}
                className={`card-surface group flex flex-col overflow-hidden rounded-[28px] ${SPANS[i] || 'lg:col-span-2'} ${
                  i === growth.steps.length - 1 && growth.steps.length % 2 === 1 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative flex h-48 items-center overflow-hidden bg-gradient-to-br from-[#fff8e6] via-surface-muted to-surface-muted">
                  <div className="bg-grid absolute inset-0 opacity-40" />
                  <div aria-hidden className="relative w-full transition-transform duration-500 group-hover:-translate-y-1">
                    <Visual />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <Chip className="self-start">{item.step}</Chip>
                  <h3 className="mt-4 text-xl font-black leading-snug tracking-tight text-text-primary md:text-[1.35rem]">
                    {item.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {item.desc.map((line, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-text-secondary">
                        <CheckCircle2 size={17} className="mt-[3px] shrink-0 text-accent-primary" />
                        <span>{line.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Growth;
