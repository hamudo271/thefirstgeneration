import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, Accented } from '../common/ui.jsx';
import CreatorGrid from '../common/CreatorGrid.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Creator roster (소속 유튜버/인플루언서 목록)
const Partners = () => {
  const { partners } = useContent('home');
  return (
    <section className="border-b border-border-primary bg-bg-primary py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-accent-primary"
          >
            {partners.eyebrow}
          </motion.span>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="whitespace-pre-line text-2xl font-black tracking-tight text-text-primary md:text-4xl"
          >
            <Accented text={partners.headline} accent={partners.accent} />
          </motion.h2>
        </div>
        <CreatorGrid items={partners.items} />
      </div>
    </section>
  );
};

export default Partners;
