import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { fadeInUp, stagger, ButtonLink } from '../common/ui.jsx';
import SocialLinks from '../common/SocialLinks.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Final CTA — ink panel: headline left, checklist + button right.
const FinalCta = () => {
  const { finalCta } = useContent('home');
  const { footer } = useContent('global');
  return (
    <section className="bg-bg-primary px-4 pb-20 pt-6 md:px-6 md:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink md:rounded-[40px]">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
          alt="" aria-hidden loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(640px circle at 0% 100%, rgba(234,164,0,0.25), transparent 60%)' }}
        />
        <div className="relative z-10 grid gap-12 px-6 py-20 md:px-14 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="whitespace-pre-line text-lg font-bold leading-snug text-white/45 md:text-xl"
            >
              {finalCta.eyebrow}
            </motion.p>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mt-4 whitespace-pre-line text-[2.1rem] font-black leading-[1.12] tracking-[-0.03em] text-white md:text-6xl"
            >
              {finalCta.headline}
            </motion.h2>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mt-8 whitespace-pre-line text-base font-semibold leading-relaxed text-white/80 md:text-lg"
            >
              {finalCta.closing}
            </motion.p>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-[28px] border border-white/10 bg-white/[0.05] p-7 backdrop-blur md:p-8 lg:col-span-5"
          >
            <ul className="space-y-4">
              {finalCta.bullets.map((b, i) => (
                <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/75">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent-soft" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7">
              <ButtonLink to="/contact" size="lg">{finalCta.button}</ButtonLink>
              <SocialLinks socials={footer?.socials} tone="light" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
