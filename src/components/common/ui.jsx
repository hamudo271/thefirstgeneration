import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';

// Shared easing curve used across the site's scroll/entrance animations.
export const EASE_STANDARD = [0.22, 1, 0.36, 1];

// Shared animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_STANDARD } },
};
export const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/** Gradient-highlight the `accent` substring inside `text`. */
export const Accented = ({ text = '', accent }) => {
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const [before, after] = text.split(accent);
  return (
    <>
      {before}
      <span className="text-gradient">{accent}</span>
      {after}
    </>
  );
};

/** Small outlined pill that sits above section headlines. */
const EYEBROW_TONES = {
  light: 'border-accent-primary/35 bg-accent-primary/[0.06] text-accent-secondary',
  dark: 'border-white/15 bg-white/[0.06] text-accent-soft',
};
export const Eyebrow = ({ children, tone = 'light', className = '' }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${EYEBROW_TONES[tone]} ${className}`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${tone === 'dark' ? 'bg-accent-soft' : 'bg-accent-primary'}`} />
    {children}
  </span>
);

/** Status chip used on cards (e.g. "Step 1", "숏폼"). */
const CHIP_TONES = {
  gold: 'bg-accent-primary/12 text-accent-secondary',
  muted: 'bg-surface-muted text-text-secondary',
  dark: 'bg-text-primary text-white',
  glass: 'bg-white/10 text-white backdrop-blur',
};
export const Chip = ({ children, tone = 'gold', className = '' }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${CHIP_TONES[tone]} ${className}`}>
    {children}
  </span>
);

/**
 * Pill button/link. `variant` picks the surface, `size` the scale.
 * The primary variant carries an arrow in a small inset circle.
 */
const BUTTON_VARIANTS = {
  primary: 'bg-brand-gradient shadow-[0_14px_30px_-14px_rgba(234,164,0,0.75)] hover:shadow-[0_18px_36px_-14px_rgba(234,164,0,0.9)]',
  dark: 'bg-text-primary text-white hover:bg-black',
  light: 'bg-white text-text-primary hover:bg-white/90',
  outline: 'border border-border-primary bg-bg-elevated text-text-primary hover:border-text-primary',
  outlineDark: 'border border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06]',
};
const BUTTON_SIZES = {
  md: 'gap-2.5 py-2.5 pl-5 pr-2.5 text-sm',
  lg: 'gap-3 py-3 pl-7 pr-3 text-base',
};
const ARROW_TONES = {
  primary: 'bg-white/90 text-accent-ink',
  dark: 'bg-white/15 text-white',
  light: 'bg-text-primary text-white',
  outline: 'bg-surface-muted text-text-primary',
  outlineDark: 'bg-white/10 text-white',
};
export const ButtonLink = ({ to, href, variant = 'primary', size = 'md', arrow = true, className = '', children, ...rest }) => {
  const Comp = href ? 'a' : to ? Link : 'button';
  const target = href ? { href } : to ? { to } : { type: rest.type || 'button' };
  const pad = arrow ? BUTTON_SIZES[size] : size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';
  return (
    <Comp
      {...target}
      className={`group/btn inline-flex items-center whitespace-nowrap rounded-full font-bold transition-all duration-300 active:scale-[0.98] ${BUTTON_VARIANTS[variant]} ${pad} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && (
        <span
          className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5 ${ARROW_TONES[variant]} ${
            size === 'lg' ? 'h-9 w-9' : 'h-7 w-7'
          }`}
        >
          <ArrowRight size={size === 'lg' ? 17 : 15} strokeWidth={2.4} />
        </span>
      )}
    </Comp>
  );
};

/** Plain text link with a trailing arrow ("전체 보기 →"). */
export const TextLink = ({ to, children, tone = 'light', className = '' }) => (
  <Link
    to={to}
    className={`group/link inline-flex items-center gap-1.5 text-[15px] font-bold transition-colors ${
      tone === 'dark' ? 'text-white/85 hover:text-white' : 'text-accent-secondary hover:text-text-primary'
    } ${className}`}
  >
    {children}
    <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
  </Link>
);

/** Premium page hero: eyebrow pill, oversized title, split subhead. */
export const PageHero = ({ eyebrow, title, accent, subhead, children }) => (
  <section className="relative overflow-hidden bg-bg-primary pb-16 pt-36 md:pb-24 md:pt-48">
    <div
      className="bg-grid absolute inset-0 opacity-50"
      style={{
        maskImage: 'radial-gradient(ellipse 70% 80% at 15% 0%, #000 25%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 15% 0%, #000 25%, transparent 70%)',
      }}
    />
    <div className="glow-accent absolute inset-0 opacity-80" style={{ '--gx': '8%', '--gy': '-10%' }} />
    <div className="relative z-10 mx-auto max-w-7xl px-6">
      {eyebrow && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7">
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <motion.h1
          initial="hidden" animate="visible" variants={fadeInUp}
          className="whitespace-pre-line text-[2.6rem] font-black leading-[1.06] tracking-[-0.035em] text-text-primary md:text-7xl lg:col-span-7"
        >
          <Accented text={title} accent={accent} />
        </motion.h1>
        {subhead && (
          <motion.p
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.15 }}
            className="max-w-xl whitespace-pre-line text-lg leading-relaxed text-text-secondary md:text-xl lg:col-span-5 lg:max-w-none lg:border-l lg:border-border-primary lg:pb-2 lg:pl-8"
          >
            {subhead}
          </motion.p>
        )}
      </div>
      {children}
    </div>
  </section>
);

/**
 * Section heading block.
 * `split` puts the headline left and the subhead/action right on desktop;
 * `center` stacks everything centred; `tone="dark"` for ink panels.
 */
export const SectionHeader = ({ eyebrow, headline, accent, subhead, center, split, action, tone = 'light', className = '' }) => {
  const dark = tone === 'dark';
  const head = (
    <>
      {eyebrow && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-5">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <motion.h2
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className={`whitespace-pre-line text-[2rem] font-black leading-[1.12] tracking-[-0.03em] md:text-5xl lg:text-[3.4rem] ${
          dark ? 'text-white' : 'text-text-primary'
        }`}
      >
        <Accented text={headline} accent={accent} />
      </motion.h2>
    </>
  );
  const side = (subhead || action) && (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
      {subhead && (
        <p
          className={`whitespace-pre-line text-base leading-relaxed md:text-lg ${dark ? 'text-white/60' : 'text-text-secondary'} ${
            center ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {subhead}
        </p>
      )}
      {action && <div className={subhead ? 'mt-6' : ''}>{action}</div>}
    </motion.div>
  );

  if (split) {
    return (
      <div className={`mb-14 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
        <div className="lg:col-span-7">{head}</div>
        {side && <div className="lg:col-span-5 lg:pb-1.5">{side}</div>}
      </div>
    );
  }
  return (
    <div className={`mb-14 md:mb-16 ${center ? 'text-center' : ''} ${className}`}>
      {head}
      {side && <div className="mt-5">{side}</div>}
    </div>
  );
};

/** Rounded ink CTA panel (sits inside the page container, not full-bleed). */
export const CTABand = ({ eyebrow, headline, subhead, button, to = '/contact', secondary, secondaryTo = '/portfolio' }) => (
  <section className="bg-bg-primary px-4 py-20 md:px-6 md:py-28">
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-20 text-center md:rounded-[40px] md:px-12 md:py-28">
      <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(620px circle at 15% 0%, rgba(234,164,0,0.28), transparent 60%), radial-gradient(520px circle at 90% 100%, rgba(180,119,10,0.24), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        {eyebrow && (
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mb-5 whitespace-pre-line text-base font-semibold text-white/55 md:text-lg"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mx-auto max-w-3xl whitespace-pre-line text-[2rem] font-black leading-[1.15] tracking-[-0.03em] text-white md:text-5xl"
        >
          {headline}
        </motion.h2>
        {subhead && (
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-base leading-relaxed text-white/60 md:text-lg"
          >
            {subhead}
          </motion.p>
        )}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <ButtonLink to={to} size="lg">{button}</ButtonLink>
          {secondary && (
            <ButtonLink to={secondaryTo} variant="outlineDark" size="lg">{secondary}</ButtonLink>
          )}
        </motion.div>
      </div>
    </div>
  </section>
);

/** Reusable YouTube lightbox. */
export const VideoLightbox = ({ videoId, onClose }) => (
  <AnimatePresence>
    {videoId && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
      >
        <button
          onClick={onClose} aria-label="닫기"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <X size={22} />
        </button>
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="더퍼스트제너레이션 제작 사례"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
