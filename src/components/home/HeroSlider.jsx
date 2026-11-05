import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useContent } from '../../context/ContentContext.jsx';
import { EASE_STANDARD, Eyebrow, ButtonLink, TextLink } from '../common/ui.jsx';

const AUTOPLAY_MS = 6500;

const thumb = (id, q = 'hqdefault') => `https://img.youtube.com/vi/${id}/${q}.jpg`;

/** Highlight the `accent` substring inside a title line with gradient text. */
const renderTitle = (title, accent) =>
  title.split('\n').map((line, li) => {
    if (!accent || !line.includes(accent)) {
      return <span key={li} className="block">{line}</span>;
    }
    const [before, after] = line.split(accent);
    return (
      <span key={li} className="block">
        {before}
        <span className="text-gradient">{accent}</span>
        {after}
      </span>
    );
  });

// Right-hand "stage": a player window cycling real cases + a phone with a short.
const Stage = ({ items, short, index, onSelect, onPlay }) => {
  const active = items[index % items.length];
  return (
    <div className="relative mx-auto w-full max-w-[640px] pb-10 lg:pb-14">
      <div className="overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.06] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Window chrome + creator tabs */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <div className="no-scrollbar flex min-w-0 flex-1 gap-1 overflow-x-auto" role="tablist" aria-label="제작 사례">
            {items.map((c, i) => (
              <button
                key={c.videoId}
                role="tab"
                aria-selected={i === index % items.length}
                onClick={() => onSelect(i)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  i === index % items.length ? 'bg-white text-text-primary' : 'text-white/55 hover:text-white'
                }`}
              >
                {c.creator || c.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Player */}
        <button
          onClick={() => onPlay?.(active.videoId)}
          className="group relative block aspect-video w-full overflow-hidden bg-black text-left"
          aria-label={`${active.title || '제작 사례'} 재생`}
        >
          <AnimatePresence mode="sync">
            <motion.img
              key={active.videoId}
              src={thumb(active.videoId)}
              alt=""
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE_STANDARD }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-primary">
            <Play size={24} className="ml-1 fill-white text-white" />
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-soft">{active.tag}</span>
              <span className="mt-1 block truncate text-sm font-bold text-white md:text-base">{active.title}</span>
            </span>
          </span>
        </button>

        {/* Progress dots for the stage */}
        <div className="flex items-center justify-center gap-1.5 py-3">
          {items.map((c, i) => (
            <span
              key={c.videoId}
              className={`h-1 rounded-full transition-all duration-500 ${i === index % items.length ? 'w-5 bg-accent-soft' : 'w-1 bg-white/25'}`}
            />
          ))}
        </div>
      </div>

      {/* Phone with a short */}
      {short && (
        <button
          onClick={() => onPlay?.(short.videoId)}
          aria-label={`${short.title || '숏폼'} 재생`}
          className="group absolute -bottom-2 right-2 w-[30%] min-w-[104px] max-w-[176px] rounded-[26px] border-[5px] border-[#0b0c10] bg-[#0b0c10] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/15 sm:-right-4 lg:-right-8"
        >
          <span className="absolute left-1/2 top-1.5 z-10 h-3.5 w-12 -translate-x-1/2 rounded-full bg-black" aria-hidden />
          <span className="relative block aspect-[9/19] overflow-hidden rounded-[21px] bg-black">
            <img src={thumb(short.videoId)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <span className="absolute left-2 top-6 rounded-md bg-[#ff0033] px-1.5 py-0.5 text-[9px] font-black text-white">Shorts</span>
            <span className="absolute inset-x-2 bottom-3 text-left text-[10px] font-bold leading-tight text-white">{short.title}</span>
          </span>
        </button>
      )}
    </div>
  );
};

const HeroSlider = ({ onPlay }) => {
  const { heroSlides, brandIntro, cases } = useContent('home');
  const slides = heroSlides?.items || [];
  const bgVideo = heroSlides?.bgVideo;
  const bgVideoPoster = heroSlides?.bgVideoPoster;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Hold the background video back until the page has finished loading, so the
  // poster is the LCP paint instead of the 2.8MB mp4. Stays null during SSR.
  const [deferredVideo, setDeferredVideo] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const timer = useRef(null);
  const total = slides.length;
  const paused = hovered || stopped || reduceMotion;

  const caseItems = cases?.items || [];
  const stageItems = caseItems.filter((c) => !/쇼츠/.test(c.tag)).slice(0, Math.max(total, 1));
  const short = caseItems.find((c) => /쇼츠/.test(c.tag));

  const go = useCallback((dir) => setIndex((i) => (i + dir + total) % total), [total]);

  useEffect(() => {
    if (paused || total <= 1) return undefined;
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(timer.current);
  }, [index, paused, total]);

  // Attach the background video only once everything else has loaded.
  useEffect(() => {
    if (!bgVideo) return undefined;
    const attach = () => setDeferredVideo(bgVideo);
    if (document.readyState === 'complete') {
      attach();
      return undefined;
    }
    window.addEventListener('load', attach, { once: true });
    return () => window.removeEventListener('load', attach);
  }, [bgVideo]);

  if (total === 0) return null;
  const trust = (brandIntro?.stats || []).slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-ink lg:flex lg:min-h-[760px] lg:items-center xl:min-h-screen">
      {/* Background video, heavily dimmed so the stage reads first */}
      {bgVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          src={deferredVideo || undefined}
          poster={bgVideoPoster}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(760px circle at 8% 100%, rgba(234,164,0,0.20), transparent 60%), radial-gradient(640px circle at 88% 10%, rgba(180,119,10,0.18), transparent 60%)',
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-32 md:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-32">
        {/* Copy */}
        <div
          className="min-w-0 lg:col-span-6"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* All slides share one grid cell, so the block is always as tall as
              the longest slide — no layout jump, no dead space. */}
          <div className="grid">
            {slides.map((sl, i) => {
              const on = i === index;
              const Title = i === 0 ? 'h1' : 'p';
              return (
                <div
                  key={i}
                  aria-hidden={!on}
                  className={`[grid-area:1/1] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    on ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0'
                  }`}
                >
                  <Eyebrow tone="dark" className="mb-6">{sl.eyebrow}</Eyebrow>
                  <Title className="text-[1.8rem] font-black leading-[1.16] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.2rem]">
                    {renderTitle(sl.title, sl.accent)}
                  </Title>
                  <p className="mt-6 max-w-lg whitespace-pre-line text-base leading-relaxed text-white/65 md:text-lg">
                    {sl.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink to="/contact" size="lg">{heroSlides.ctaPrimary}</ButtonLink>
            <TextLink to="/portfolio" tone="dark">{heroSlides.ctaSecondary}</TextLink>
          </div>

          {trust.length > 0 && (
            <ul className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white/50">
              {trust.map((s, i) => (
                <li key={s.label} className="flex items-center gap-4">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />}
                  <span>
                    {s.label} <strong className="font-bold text-white/90">{s.value}</strong>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Slide controls */}
          <div className="mt-10 flex items-center gap-4">
            <span className="text-sm font-bold tabular-nums text-white">
              {String(index + 1).padStart(2, '0')}
              <span className="text-white/35"> / {String(total).padStart(2, '0')}</span>
            </span>
            <div className="relative h-[2px] w-24 overflow-hidden rounded-full bg-white/15 sm:w-36">
              <motion.div
                key={index + (paused ? '-p' : '')}
                className="absolute inset-y-0 left-0 bg-accent-soft"
                initial={{ width: paused ? '100%' : '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => go(-1)}
                aria-label="이전 슬라이드"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => setStopped((v) => !v)}
                aria-label={stopped ? '자동 재생' : '일시 정지'}
                aria-pressed={stopped}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                {stopped ? <Play size={14} className="ml-0.5 fill-current" /> : <Pause size={14} className="fill-current" />}
              </button>
              <button
                onClick={() => go(1)}
                aria-label="다음 슬라이드"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Stage */}
        {stageItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_STANDARD }}
            className="min-w-0 lg:col-span-6"
          >
            <Stage items={stageItems} short={short} index={index} onSelect={setIndex} onPlay={onPlay} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSlider;
