import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext.jsx';
import { EASE_STANDARD } from '../common/ui.jsx';

/**
 * Floating glass dock pinned to the bottom centre. Appears once the visitor
 * has scrolled past the hero (so it never covers the first screen), shows a
 * soft live-viewer count + monthly remaining slots, and can be dismissed.
 */
const ScarcityBar = () => {
  const { scarcity } = useContent('home');
  const [pastHero, setPastHero] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [viewers, setViewers] = useState(scarcity?.baseViewers ?? 11);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gently fluctuate the viewer count for a "live" feel
  useEffect(() => {
    const base = scarcity?.baseViewers ?? 11;
    const id = setInterval(() => {
      setViewers(base + Math.floor(Math.sin(Date.now() / 4000) * 3 + 3));
    }, 4000);
    return () => clearInterval(id);
  }, [scarcity]);

  if (!scarcity) return null;

  return (
    <AnimatePresence>
      {pastHero && !dismissed && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_STANDARD }}
          className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[620px] -translate-x-1/2 md:bottom-6"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/85 py-2 pl-5 pr-2 text-white shadow-[0_24px_50px_-20px_rgba(11,16,32,0.7)] backdrop-blur-xl sm:gap-4">
            {/* Live viewers */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <p className="whitespace-nowrap text-xs text-white/60">
                {scarcity.viewingPrefix}{' '}
                <span className="font-bold tabular-nums text-white">{viewers}</span>
                {scarcity.viewingSuffix}
              </p>
            </div>

            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />

            {/* Remaining slots */}
            <p className="flex min-w-0 items-center gap-2 whitespace-nowrap text-xs text-white/70 sm:text-[13px]">
              {scarcity.remainingLabel}
              <span className="rounded-full bg-accent-primary/20 px-2 py-0.5 font-black tabular-nums text-accent-soft">
                {scarcity.remainingCount}
                {scarcity.remainingUnit}
              </span>
            </p>

            <Link
              to="/contact"
              className="bg-brand-gradient ml-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-transform hover:scale-[1.03] sm:text-[13px]"
            >
              {scarcity.button} <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => setDismissed(true)}
              aria-label="닫기"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScarcityBar;
