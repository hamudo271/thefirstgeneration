import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Youtube, Instagram } from 'lucide-react';
import { fadeInUp, stagger, EASE_STANDARD } from './ui.jsx';

// "9.64만명" → 96400, "5.92천명" → 5920, "121명" → 121
const parseCount = (s = '') => {
  const m = String(s).replace(/,/g, '').match(/([\d.]+)\s*(만|천)?/);
  if (!m) return 0;
  return parseFloat(m[1]) * (m[2] === '만' ? 10000 : m[2] === '천' ? 1000 : 1);
};
// "맛집 소개 / 게임" → "맛집 소개" (a spaced slash separates a secondary topic)
const categoryOf = (desc = '') => desc.split(' / ')[0].trim();

const PLATFORM = {
  유튜브: { Icon: Youtube, color: '#ff3b30' },
  인스타: { Icon: Instagram, color: '#e4405f' },
};

/**
 * Infographic panel computed from the creator roster (home.partners.items):
 * channel count, platform split, number of topics and the top-5 by followers.
 * Nothing is hard-coded, so it stays correct when the roster changes.
 */
const CreatorData = ({ items = [], labels }) => {
  const reduce = useReducedMotion();
  if (!items.length || !labels) return null;

  const yt = items.filter((c) => c.channel === '유튜브').length;
  const ig = items.filter((c) => c.channel === '인스타').length;
  const total = items.length;
  const categories = Object.entries(
    items.reduce((acc, c) => {
      const k = categoryOf(c.desc);
      if (k) acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const top = [...items].sort((a, b) => parseCount(b.followers) - parseCount(a.followers)).slice(0, 5);
  const max = parseCount(top[0]?.followers) || 1;
  const pct = (n) => Math.round((n / total) * 100);

  const grow = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { scaleX: 0 },
          whileInView: { scaleX: 1 },
          viewport: { once: true },
          transition: { duration: 1.1, delay, ease: EASE_STANDARD },
        };

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeInUp}
      className="relative mb-12 overflow-hidden rounded-[32px] bg-ink p-7 text-white md:mb-16 md:p-12"
    >
      <div className="dot-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_top_left,#000_20%,transparent_70%)]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(560px circle at 100% 100%, rgba(234,164,0,0.22), transparent 60%)' }}
        aria-hidden
      />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left — statement, big numbers, platform split */}
        <div className="lg:col-span-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-soft">{labels.eyebrow}</p>
          <h3 className="mt-4 whitespace-pre-line text-[1.8rem] font-black leading-[1.2] tracking-[-0.03em] md:text-[2.3rem]">
            {labels.title.replace('{channels}', total)}
          </h3>

          <dl className="mt-9 grid grid-cols-2 border-y border-white/10">
            {[
              [labels.channelsLabel, total],
              [labels.categoriesLabel, categories.length],
            ].map(([label, n], i) => (
              <div key={label} className={`py-5 ${i ? 'border-l border-white/10 pl-6' : ''}`}>
                <dt className="text-xs font-semibold text-white/45">{label}</dt>
                <dd className="mt-1 text-[2.6rem] font-black leading-none tracking-tight tabular-nums">{n}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold text-white/45">{labels.platformLabel}</p>
            <div className="flex h-3 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${labels.youtube} ${yt}, ${labels.instagram} ${ig}`}>
              <motion.span
                className="block h-full origin-left bg-gradient-to-r from-[#ff6a3d] to-[#ff2d55]"
                style={{ width: `${pct(yt)}%` }}
                {...grow(0.2)}
              />
              <motion.span
                className="block h-full origin-left bg-gradient-to-r from-[#c13584] to-[#f77737]"
                style={{ width: `${pct(ig)}%` }}
                {...grow(0.5)}
              />
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[
                [labels.youtube, yt, '유튜브'],
                [labels.instagram, ig, '인스타'],
              ].map(([name, n, key]) => {
                const { Icon, color } = PLATFORM[key];
                return (
                  <li key={key} className="flex items-center gap-2 text-white/75">
                    <Icon size={15} color={color} />
                    {name}
                    <strong className="font-bold tabular-nums text-white">{n}</strong>
                    <span className="text-white/40">{pct(n)}%</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right — top 5 by followers */}
        <div className="lg:col-span-7">
          <p className="mb-5 text-xs font-semibold text-white/45">{labels.topLabel}</p>
          <motion.ol variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {top.map((c, i) => {
              const { Icon, color } = PLATFORM[c.channel] || PLATFORM['인스타'];
              const share = parseCount(c.followers) / max;
              return (
                <motion.li
                  key={c.name}
                  variants={fadeInUp}
                  className="grid grid-cols-[1.25rem_2.5rem_1fr] items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 md:grid-cols-[1.5rem_2.75rem_10rem_1fr] md:gap-4"
                >
                  <span className="text-sm font-black tabular-nums text-white/35">{i + 1}</span>
                  <span className="relative h-10 w-10 md:h-11 md:w-11">
                    {c.image ? (
                      <img src={c.image} alt="" loading="lazy" className="h-full w-full rounded-full object-cover ring-1 ring-white/15" />
                    ) : (
                      <span className="bg-brand-gradient flex h-full w-full items-center justify-center rounded-full font-black">{c.name.charAt(0)}</span>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white">
                      <Icon size={10} color={color} />
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-bold">{c.name}</span>
                    <span className="block truncate text-xs text-white/45 md:hidden">{c.followers}</span>
                  </span>
                  <span className="col-span-3 flex items-center gap-3 md:col-span-1">
                    <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                      <motion.span
                        className={`absolute inset-y-0 left-0 origin-left rounded-full ${
                          i === 0 ? 'bg-gradient-to-r from-accent-soft to-accent-primary' : 'bg-gradient-to-r from-accent-primary/70 to-accent-secondary/70'
                        }`}
                        style={{ width: `${Math.max(4, share * 100)}%` }}
                        {...grow(0.15 + i * 0.08)}
                      />
                    </span>
                    <span className="hidden w-16 shrink-0 text-right text-sm font-bold tabular-nums md:block">{c.followers}</span>
                  </span>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>

      {/* Topics as tags */}
      <div className="relative mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-7">
        {categories.map(([name, n]) => (
          <span key={name} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/75">
            #{name}
            {n > 1 && <span className="ml-1.5 font-black text-accent-soft">×{n}</span>}
          </span>
        ))}
        <span className="ml-auto pt-2 text-[11px] text-white/35 md:pt-0">{labels.note}</span>
      </div>
    </motion.div>
  );
};

export default CreatorData;
