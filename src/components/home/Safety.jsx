import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Sprout } from 'lucide-react';
import { fadeInUp, stagger, Accented, EASE_STANDARD } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

const R = 46;
const C = 2 * Math.PI * R;

// Circular gauge that fills to `ring` percent once scrolled into view.
const Ring = ({ value, unit, ring = 100, label }) => {
  const reduce = useReducedMotion();
  const gid = useId();
  const offset = C * (1 - Math.min(100, ring) / 100);
  return (
    <motion.div
      variants={fadeInUp}
      className="group rounded-[24px] border border-white/10 bg-white/[0.04] px-5 pb-6 pt-7 text-center backdrop-blur transition-colors duration-500 hover:border-accent-primary/40"
    >
      <div className="relative mx-auto h-28 w-28 md:h-32 md:w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent-soft)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <motion.circle
            cx="50" cy="50" r={R} fill="none" stroke={`url(#${gid})`} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={C}
            initial={reduce ? false : { strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE_STANDARD }}
            style={reduce ? { strokeDashoffset: offset } : undefined}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="text-[2rem] font-black leading-none tracking-tight text-white md:text-[2.4rem]">{value}</span>
          <span className="ml-0.5 mt-2 text-sm font-bold text-accent-soft">{unit}</span>
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-white/65">{label}</p>
    </motion.div>
  );
};

// Safety — "안심하셔도 좋습니다" as an ink panel with gauges + two promises
const Safety = () => {
  const { safety } = useContent('home');
  const cards = [
    { title: safety.card1Title, body: safety.card1Body, icon: ShieldCheck },
    { title: safety.card2Title, body: safety.card2Body, icon: Sprout },
  ];
  const metrics = safety.metrics || [];

  return (
    <section className="bg-bg-primary px-4 py-6 md:px-6 md:py-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-20 md:rounded-[40px] md:px-14 md:py-28">
        <div className="dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(640px circle at 20% 0%, rgba(234,164,0,0.22), transparent 60%), radial-gradient(560px circle at 95% 100%, rgba(180,119,10,0.26), transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mb-4 text-base text-white/55 md:text-lg"
            >
              {safety.subhead}
            </motion.p>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-[2rem] font-black tracking-[-0.03em] text-white md:text-5xl lg:text-[3.4rem]"
            >
              <Accented text={safety.headline} accent={safety.accent} />
            </motion.h2>
          </div>

          {metrics.length > 0 && (
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
            >
              {metrics.map((m) => (
                <Ring key={m.label} {...m} />
              ))}
            </motion.div>
          )}

          <div className="mx-auto mt-4 grid max-w-5xl grid-cols-1 gap-3 md:mt-5 md:grid-cols-2 md:gap-4">
            {cards.map((c) => (
              <motion.div
                key={c.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="flex gap-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-7 md:p-8"
              >
                <span className="bg-brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                  <c.icon size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white md:text-xl">{c.title}</h3>
                  <p className="mt-2.5 whitespace-pre-line text-[15px] leading-relaxed text-white/60">{c.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
