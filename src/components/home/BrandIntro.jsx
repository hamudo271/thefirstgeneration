import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Users, TrendingUp, Award } from 'lucide-react';
import { fadeInUp, stagger, Accented, EASE_STANDARD, Eyebrow } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Icons matched to each stat by index.
const STAT_ICONS = [Play, Users, TrendingUp, Award];

// Bento slot per stat index: 0 = hero (views), 1 = wide (creators),
// 2 = small (followers), 3 = dark (rank). Extra stats fall back to small.
const SLOTS = [
  'col-span-2 md:row-span-2 min-h-[320px] md:min-h-0',
  'col-span-2 min-h-[200px]',
  'col-span-1 min-h-[200px]',
  'col-span-1 min-h-[200px]',
];

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

// Bento card with a cursor-following gold spotlight.
const SpotlightCard = ({ className = '', dark = false, children }) => {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const tone = dark
    ? 'border-white/10 bg-text-primary text-white shadow-[0_30px_60px_-30px_rgba(11,16,32,0.6)]'
    : 'border-border-primary bg-bg-elevated/80 backdrop-blur-xl shadow-[0_24px_48px_-32px_rgba(11,16,32,0.22)] hover:border-accent-primary/50';
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      onMouseMove={onMove}
      className={`group relative isolate flex flex-col overflow-hidden rounded-[28px] border p-6 transition-colors duration-500 md:p-8 ${tone} ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent-primary) ${dark ? 22 : 14}%, transparent), transparent 45%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

const CardHead = ({ icon, label, dark }) => {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          dark ? 'bg-white/10 text-accent-soft' : 'bg-accent-primary/10 text-accent-secondary'
        }`}
      >
        <Icon size={17} strokeWidth={2.25} />
      </span>
      <span className={`text-sm font-semibold ${dark ? 'text-white/65' : 'text-text-secondary'}`}>{label}</span>
    </div>
  );
};

// Decorative growth curve that draws itself in (hero card).
const GrowthCurve = () => {
  const reduce = useReducedMotion();
  const line = 'M0,148 C48,144 80,136 112,126 S172,116 204,98 S262,72 292,60 S356,30 400,14';
  const draw = reduce ? {} : { initial: { pathLength: 0 }, whileInView: { pathLength: 1 } };
  const fade = reduce ? {} : { initial: { opacity: 0 }, whileInView: { opacity: 1 } };
  return (
    <svg aria-hidden viewBox="0 0 400 170" preserveAspectRatio="none" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="brandIntroArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${line} L400,170 L0,170 Z`} fill="url(#brandIntroArea)"
        {...fade} viewport={{ once: true }} transition={{ duration: 1, delay: 1.1, ease: EASE_STANDARD }}
      />
      <motion.path
        d={line} fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round"
        {...draw} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE_STANDARD }}
      />
    </svg>
  );
};

// Ascending mini bars (followers card).
const BAR_HEIGHTS = [34, 46, 40, 58, 70, 84, 100];
const GrowthBars = () => {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="flex h-16 items-end gap-1.5 md:gap-2">
      {BAR_HEIGHTS.map((h, i) => (
        <motion.span
          key={i}
          className={`block flex-1 origin-bottom rounded-[5px] ${
            i === BAR_HEIGHTS.length - 1 ? 'bg-brand-gradient' : 'bg-accent-primary/20 transition-colors duration-500 group-hover:bg-accent-primary/35'
          }`}
          style={{ height: `${h}%` }}
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: EASE_STANDARD }}
        />
      ))}
    </div>
  );
};

// Overlapping creator avatars pulled from the real roster (creators card).
const AvatarStack = ({ creators }) => {
  const shown = creators.filter((c) => c.image).slice(0, 6);
  const rest = creators.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((c, i) => (
        <motion.img
          key={c.name}
          src={c.image} alt={c.name} title={c.name} loading="lazy"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.06, ease: EASE_STANDARD }}
          className="-ml-3 h-11 w-11 rounded-full object-cover ring-[3px] ring-bg-elevated transition-[margin] duration-500 first:ml-0 group-hover:-ml-1.5 group-hover:first:ml-0 md:h-12 md:w-12"
        />
      ))}
      {rest > 0 && (
        <span className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full bg-text-primary text-xs font-bold text-white ring-[3px] ring-bg-elevated transition-[margin] duration-500 group-hover:-ml-1.5 md:h-12 md:w-12">
          +{rest}
        </span>
      )}
    </div>
  );
};

// Brand intro — editorial split header + bento stat grid.
const BrandIntro = () => {
  const { brandIntro, partners } = useContent('home');
  const [views, creators, followers, rank, ...extra] = brandIntro.stats;

  return (
    <section className="relative overflow-hidden bg-bg-primary py-28 md:py-36">
      <div
        className="bg-grid absolute inset-0 opacity-50"
        style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 30% 20%, #000 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 30% 20%, #000 30%, transparent 75%)' }}
      />
      <div className="glow-accent absolute inset-0" style={{ '--gx': '20%', '--gy': '10%' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Editorial split header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mb-6"
            >
              <Eyebrow>{brandIntro.eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="whitespace-pre-line text-[2.2rem] font-black leading-[1.08] tracking-[-0.035em] text-text-primary md:text-6xl lg:text-7xl"
            >
              <Accented text={brandIntro.headline} accent={brandIntro.accent} />
            </motion.h2>
          </div>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="whitespace-pre-line text-lg leading-relaxed max-w-xl text-text-secondary md:text-xl lg:col-span-5 lg:max-w-none lg:border-l lg:border-border-primary lg:pb-2 lg:pl-8"
          >
            {brandIntro.body}
          </motion.p>
        </div>

        {/* Bento stats */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(210px,auto))] md:gap-5"
        >
          {views && (
            <SpotlightCard className={SLOTS[0]}>
              <CardHead icon={STAT_ICONS[0]} label={views.label} />
              <div className="text-gradient relative z-10 mt-6 text-6xl font-black leading-none tracking-tight tabular-nums md:text-7xl lg:text-8xl">
                <CountUp value={views.value} />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]">
                <GrowthCurve />
              </div>
            </SpotlightCard>
          )}

          {creators && (
            <SpotlightCard className={`${SLOTS[1]} justify-between`}>
              <CardHead icon={STAT_ICONS[1]} label={creators.label} />
              <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between md:flex-col md:items-start md:justify-start lg:flex-row lg:items-end lg:justify-between">
                <div className="text-5xl font-black leading-none tracking-tight tabular-nums text-text-primary md:text-6xl">
                  <CountUp value={creators.value} />
                </div>
                <AvatarStack creators={partners?.items || []} />
              </div>
            </SpotlightCard>
          )}

          {followers && (
            <SpotlightCard className={`${SLOTS[2]} justify-between`}>
              <CardHead icon={STAT_ICONS[2]} label={followers.label} />
              <div className="mt-6">
                <div className="text-4xl font-black leading-none tracking-tight tabular-nums text-text-primary md:text-5xl">
                  <CountUp value={followers.value} />
                </div>
                <div className="mt-5">
                  <GrowthBars />
                </div>
              </div>
            </SpotlightCard>
          )}

          {rank && (
            <SpotlightCard dark className={`${SLOTS[3]} justify-between`}>
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(260px circle at 100% 0%, color-mix(in srgb, var(--accent-primary) 30%, transparent), transparent 70%)' }}
              />
              <Award
                aria-hidden size={132} strokeWidth={1}
                className="absolute -bottom-6 -right-6 -z-10 text-white/[0.06] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110"
              />
              <CardHead icon={STAT_ICONS[3]} label={rank.label} dark />
              <div className="text-gradient mt-6 text-5xl font-black leading-none tracking-tight tabular-nums md:text-6xl">
                <CountUp value={rank.value} />
              </div>
            </SpotlightCard>
          )}

          {extra.map((s, i) => {
            const Icon = STAT_ICONS[(i + 4) % STAT_ICONS.length];
            return (
              <SpotlightCard key={i} className="col-span-1 min-h-[200px] justify-between">
                <CardHead icon={Icon} label={s.label} />
                <div className="mt-6 text-4xl font-black leading-none tracking-tight tabular-nums text-text-primary md:text-5xl">
                  <CountUp value={s.value} />
                </div>
              </SpotlightCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandIntro;
