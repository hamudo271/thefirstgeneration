import React from 'react';
import { motion } from 'framer-motion';
import { MessagesSquare, FileSignature, ClipboardList, Clapperboard, Scissors, RefreshCcw, Rocket, Circle } from 'lucide-react';
import { fadeInUp, stagger, SectionHeader, ButtonLink } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Icon per step, in order (상담 → 완성). Extra steps fall back to a dot.
const STEP_ICONS = [MessagesSquare, FileSignature, ClipboardList, Clapperboard, Scissors, RefreshCcw, Rocket];
// Alternate gold and ink tiles so neighbouring steps stay distinguishable.
const TILE = [
  'bg-brand-gradient shadow-[0_12px_24px_-12px_rgba(234,164,0,0.9)]',
  'bg-text-primary text-white shadow-[0_12px_24px_-12px_rgba(11,16,32,0.7)]',
];

// Process — step cards on a 4-col grid; the last slot is a CTA card.
const Process = () => {
  const { process } = useContent('home');
  const steps = process.steps;

  return (
    <section className="bg-surface-muted py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          split
          eyebrow={process.eyebrow}
          headline={process.title}
          subhead={process.subhead?.replace('{n}', steps.length)}
        />

        <motion.ol
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {steps.map((item, i) => {
            const Icon = STEP_ICONS[i] || Circle;
            return (
              <motion.li key={item.step} variants={fadeInUp} className="card-surface relative flex flex-col rounded-[28px] p-7">
                <div className="flex items-start justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${TILE[i % 2]}`}>
                    <Icon size={21} strokeWidth={2.1} />
                  </span>
                  <span className="text-[2.6rem] font-black leading-none tracking-tight text-text-primary/[0.07]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-black tracking-tight text-text-primary">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{item.desc}</p>
              </motion.li>
            );
          })}

          {/* CTA slot */}
          <motion.li
            variants={fadeInUp}
            className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-7 text-white"
          >
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(320px circle at 100% 0%, rgba(234,164,0,0.35), transparent 65%)' }}
              aria-hidden
            />
            <p className="relative text-lg font-black leading-snug">
              {process.ctaTitle}
              <span className="mt-2 block text-[15px] font-medium leading-relaxed text-white/60">{process.ctaBody}</span>
            </p>
            <ButtonLink to="/contact" className="relative mt-8 self-start">{process.ctaButton}</ButtonLink>
          </motion.li>
        </motion.ol>
      </div>
    </section>
  );
};

export default Process;
