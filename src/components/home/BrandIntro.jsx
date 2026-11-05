import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User, X, Check } from 'lucide-react';
import { fadeInUp, stagger, Accented, EASE_STANDARD, Eyebrow } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

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

// "Pretty only" vs "growth" — the argument behind the numbers.
const Compare = ({ compare }) => {
  if (!compare?.before || !compare?.after) return null;
  return (
    <motion.div
      variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      className="relative mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5"
    >
      <motion.div variants={fadeInUp} className="rounded-[28px] border border-border-primary bg-surface-muted p-7 md:p-10">
        <p className="text-sm font-bold text-text-secondary">{compare.before.label}</p>
        <ul className="mt-5 divide-y divide-border-primary">
          {compare.before.items.map((item) => (
            <li key={item} className="flex items-start gap-3.5 py-4 md:py-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-text-primary/[0.07] text-text-secondary">
                <X size={13} strokeWidth={2.75} />
              </span>
              <span className="text-[15px] leading-relaxed text-text-secondary md:text-[17px]">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={fadeInUp} className="relative isolate overflow-hidden rounded-[28px] bg-ink p-7 text-white md:p-10">
        <div
          aria-hidden className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(420px circle at 100% 0%, rgba(234,164,0,0.24), transparent 65%)' }}
        />
        <p className="text-sm font-bold text-accent-soft">{compare.after.label}</p>
        <ul className="mt-5 divide-y divide-white/10">
          {compare.after.items.map((item) => (
            <li key={item} className="flex items-start gap-3.5 py-4 md:py-5">
              <span className="bg-brand-gradient mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink">
                <Check size={13} strokeWidth={3} />
              </span>
              <span className="text-[15px] font-bold leading-relaxed md:text-[17px]">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {compare.vs && (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-primary bg-bg-primary text-sm font-black tracking-tight text-text-primary shadow-[0_12px_30px_-12px_rgba(11,16,32,0.35)] md:flex"
        >
          {compare.vs}
        </span>
      )}
    </motion.div>
  );
};


// ── Stat tiles (Apple/Toss-style: white tile, grey label, oversized number, one honest visual) ──

const Tile = ({ className = '', dark = false, children }) => (
  <motion.div
    variants={fadeInUp}
    className={`relative isolate flex flex-col overflow-hidden rounded-[28px] p-7 transition-transform duration-500 ease-out hover:-translate-y-1 md:rounded-[32px] md:p-10 ${
      dark ? 'bg-ink text-white' : 'bg-bg-elevated'
    } ${className}`}
  >
    {children}
  </motion.div>
);

const Label = ({ children, dark }) => (
  <p className={`text-[15px] font-semibold ${dark ? 'text-white/55' : 'text-text-secondary'}`}>{children}</p>
);

const Figure = ({ value, className = '' }) => (
  <div className={`mt-3 text-[3.4rem] font-black leading-none tracking-[-0.045em] tabular-nums md:text-[4.6rem] lg:text-[5.4rem] ${className}`}>
    <CountUp value={value} />
  </div>
);

const Desc = ({ children, dark }) =>
  children ? <p className={`mt-4 text-[15px] leading-relaxed ${dark ? 'text-white/55' : 'text-text-secondary'}`}>{children}</p> : null;

// "N times the population of Korea" — N person tokens popping in.
const TimesVisual = ({ times, note, base }) => {
  const reduce = useReducedMotion();
  if (!times) return null;
  return (
    <div className="mt-auto pt-10 md:pt-14">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
        <ul className="flex gap-1 sm:gap-1.5 md:gap-2" aria-hidden>
          {Array.from({ length: times }, (_, i) => (
            <motion.li
              key={i}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/[0.12] text-accent-secondary sm:h-11 sm:w-11 md:h-[52px] md:w-[52px]"
              initial={reduce ? false : { opacity: 0, scale: 0.4, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 420, damping: 22, delay: reduce ? 0 : 0.35 + i * 0.09 }}
            >
              <User size={18} strokeWidth={2.4} />
            </motion.li>
          ))}
        </ul>
        <p className="whitespace-pre-line text-lg font-bold leading-snug tracking-tight text-text-primary md:text-xl">{note}</p>
      </div>
      {base && <p className="mt-4 text-xs text-text-secondary/80">{base}</p>}
    </div>
  );
};

// Every creator's real avatar, as a wall.
const AvatarWall = ({ creators }) => {
  const reduce = useReducedMotion();
  if (!creators.length) return null;
  return (
    <ul className="mt-auto grid grid-cols-5 gap-2.5 pt-10 md:pt-12 lg:grid-cols-10 lg:gap-2">
      {creators.map((c, i) => (
        <motion.li
          key={c.name}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 380, damping: 24, delay: reduce ? 0 : 0.2 + i * 0.03 }}
        >
          <a
            href={c.href} target="_blank" rel="noopener noreferrer" title={c.name} aria-label={c.name}
            className="block aspect-square overflow-hidden rounded-full bg-surface-muted ring-1 ring-black/5 transition-transform duration-300 hover:scale-110"
          >
            {c.image ? (
              <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-black text-text-secondary">{c.name.charAt(0)}</span>
            )}
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

// Share of a reference population, as a single Toss-style progress bar.
const RatioVisual = ({ ratio, note, base }) => {
  const reduce = useReducedMotion();
  if (!ratio) return null;
  const pct = Math.round(ratio * 100);
  return (
    <div className="mt-auto pt-10 md:pt-12">
      <div className="flex items-end justify-between gap-4">
        <p className="text-base font-bold leading-snug tracking-tight text-text-primary sm:text-lg md:text-xl">{note}</p>
        <span className="text-gradient text-2xl font-black tabular-nums md:text-[1.75rem]">{pct}%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-muted md:h-3.5" role="img" aria-label={`${note} ${pct}%`}>
        <motion.div
          className="bg-brand-gradient h-full origin-left rounded-full"
          style={{ width: `${pct}%` }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: reduce ? 0 : 0.3, ease: EASE_STANDARD }}
        />
      </div>
      {base && (
        <div className="mt-2.5 flex justify-between text-xs text-text-secondary/80">
          <span>0</span>
          <span>{base}</span>
        </div>
      )}
    </div>
  );
};

// Brand intro — editorial header, pretty-vs-growth compare, and the numbers.
const BrandIntro = () => {
  const { brandIntro, partners } = useContent('home');
  const [views, creators, followers, rank, ...extra] = brandIntro.stats;

  return (
    <section className="relative overflow-hidden bg-bg-primary py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Editorial header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-6">
          <Eyebrow>{brandIntro.eyebrow}</Eyebrow>
        </motion.div>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-[2.05rem] font-black leading-[1.14] tracking-[-0.035em] text-text-primary md:text-[3.4rem] lg:text-[4.3rem]"
        >
          {/* Each line balanced on its own so phones wrap at a natural phrase */}
          {brandIntro.headline.split('\n').map((line) => (
            <span key={line} className="block [text-wrap:balance]">
              <Accented text={line} accent={brandIntro.accent} />
            </span>
          ))}
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl [text-wrap:pretty]"
        >
          {brandIntro.body}
        </motion.p>

        <Compare compare={brandIntro.compare} />

        {/* The numbers — white tiles on one quiet panel */}
        <div className="mt-20 rounded-[34px] bg-surface-muted p-2.5 md:mt-28 md:rounded-[44px] md:p-4">
          {brandIntro.proofTitle && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1.5 px-4 pb-6 pt-6 md:px-6 md:pb-8 md:pt-8"
            >
              <h3 className="text-2xl font-black tracking-tight text-text-primary md:text-[2rem]">{brandIntro.proofTitle}</h3>
              {brandIntro.proofNote && <p className="text-xs font-semibold text-text-secondary md:text-sm">{brandIntro.proofNote}</p>}
            </motion.div>
          )}

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:gap-4 lg:grid-cols-6"
          >
            {views && (
              <Tile className="sm:col-span-2 lg:col-span-4 lg:min-h-[440px]">
                <Label>{views.label}</Label>
                <Figure value={views.value} className="text-text-primary" />
                <Desc>{views.desc}</Desc>
                <TimesVisual times={views.times} note={views.note} base={views.base} />
              </Tile>
            )}

            {rank && (
              <Tile dark className="min-h-[300px] sm:col-span-2 lg:col-span-2 lg:min-h-[440px]">
                <div
                  aria-hidden className="absolute inset-0 -z-10"
                  style={{ background: 'radial-gradient(520px circle at 50% 120%, rgba(234,164,0,0.38), transparent 60%)' }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-4 -z-10 select-none text-[15rem] font-black leading-none tracking-[-0.06em] text-white/[0.04] md:text-[18rem]"
                >
                  1
                </span>
                <Label dark>{rank.label}</Label>
                <div className="mt-auto pt-16">
                  <Figure value={rank.value} className="text-gradient" />
                  <Desc dark>{rank.desc}</Desc>
                </div>
              </Tile>
            )}

            {creators && (
              <Tile className="lg:col-span-3">
                <Label>{creators.label}</Label>
                <Figure value={creators.value} className="text-text-primary" />
                <Desc>{creators.desc}</Desc>
                <AvatarWall creators={partners?.items || []} />
              </Tile>
            )}

            {followers && (
              <Tile className="lg:col-span-3">
                <Label>{followers.label}</Label>
                <Figure value={followers.value} className="text-text-primary" />
                <Desc>{followers.desc}</Desc>
                <RatioVisual ratio={followers.ratio} note={followers.note} base={followers.base} />
              </Tile>
            )}

            {extra.map((st) => (
              <Tile key={st.label} className="lg:col-span-2">
                <Label>{st.label}</Label>
                <Figure value={st.value} className="text-text-primary" />
                <Desc>{st.desc}</Desc>
              </Tile>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro;
