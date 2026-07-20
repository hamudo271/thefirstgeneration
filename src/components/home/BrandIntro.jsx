import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, TrendingUp, Award } from 'lucide-react';
import { fadeInUp, stagger, Accented } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Icons matched to each stat by index.
const STAT_ICONS = [Play, Users, TrendingUp, Award];

// Count-up: animates the leading number from 0 → target the first time the
// card scrolls into view, preserving any suffix like "억+", "명", "만", "위".
const CountUp = ({ value }) => {
  const match = String(value).match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? 1 : 0;
  const ref = useRef(null);
  const [display, setDisplay] = useState(target != null ? (0).toFixed(decimals) : value);

  useEffect(() => {
    if (target == null) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    // Respect reduced-motion (and act as a safety net): show the final value at once.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target.toFixed(decimals));
      return undefined;
    }
    let raf;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        obs.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          setDisplay((target * eased).toFixed(decimals));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, decimals]);

  return <span ref={ref}>{target == null ? value : `${display}${suffix}`}</span>;
};

// Brand intro (grid + glow, animated stat cards)
const BrandIntro = () => {
  const { brandIntro } = useContent('home');
  return (
    <section className="relative overflow-hidden border-y border-border-primary bg-bg-primary py-32">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="glow-accent absolute inset-0" style={{ '--gx': '20%', '--gy': '10%' }} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.span
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mb-5 block text-sm font-bold uppercase tracking-[0.2em] text-accent-primary"
        >
          {brandIntro.eyebrow}
        </motion.span>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="max-w-4xl whitespace-pre-line text-4xl font-black leading-[1.1] tracking-tight text-text-primary md:text-7xl"
        >
          <Accented text={brandIntro.headline} accent={brandIntro.accent} />
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mt-8 max-w-2xl whitespace-pre-line text-lg text-text-secondary md:text-xl"
        >
          {brandIntro.body}
        </motion.p>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6"
        >
          {brandIntro.stats.map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <motion.div
                key={i} variants={fadeInUp} whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border-primary bg-bg-secondary/70 p-7 backdrop-blur transition-colors hover:border-accent-primary"
              >
                <div className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors group-hover:bg-accent-primary group-hover:text-white">
                  <Icon size={22} />
                </div>
                <div className="text-gradient text-4xl font-black leading-none md:text-5xl">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-3 text-sm font-semibold text-text-secondary">{s.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandIntro;
