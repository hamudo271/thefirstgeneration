import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Eyebrow, ButtonLink, fadeInUp, Accented } from './ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

/**
 * Shared FAQ accordion used by the Home page and the Contact page.
 * Content comes from `home.faq`; `className` styles the outer <section> so each
 * page keeps its own background/spacing. `showCta` hides the contact button
 * where the form is already on the page.
 */
const FaqAccordion = ({ className = '', showCta = true }) => {
  const { faq } = useContent('home');
  const [open, setOpen] = useState(0);
  return (
    <section className={className} id="faq">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="lg:col-span-4"
        >
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2 className="mt-5 whitespace-pre-line text-[2rem] font-black leading-[1.12] tracking-[-0.03em] text-text-primary md:text-5xl">
              <Accented text={faq.headline} accent={faq.accent} />
            </h2>
            {faq.subhead && <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">{faq.subhead}</p>}
            {showCta && faq.ctaLabel && (
              <ButtonLink to="/contact" variant="dark" className="mt-8">{faq.ctaLabel}</ButtonLink>
            )}
          </div>
        </motion.div>

        <div className="space-y-3 lg:col-span-8">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-[22px] border transition-colors duration-300 ${
                  isOpen ? 'border-accent-primary/40 bg-bg-elevated shadow-[var(--shadow-card)]' : 'border-border-primary bg-bg-elevated'
                }`}
              >
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 px-6 py-5 text-left md:px-7 md:py-6"
                  >
                    <span className="text-sm font-black text-accent-secondary">Q.</span>
                    <span className="flex-1 text-base font-bold text-text-primary md:text-[17px]">{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-text-primary text-white' : 'bg-surface-muted text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="whitespace-pre-line px-6 pb-6 pl-[3.25rem] text-[15px] leading-[1.85] text-text-secondary md:px-7 md:pl-[3.6rem]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
