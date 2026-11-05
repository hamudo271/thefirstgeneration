import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ButtonLink, fadeInUp, stagger } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

const NotFound = () => {
  const { seo, main } = useContent('notFound');
  const { header } = useContent('global');
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-6 py-32 text-center text-white">
      <SEO title={seo.title} path="/404" noIndex />
      <div className="dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(560px circle at 50% 30%, rgba(234,164,0,0.22), transparent 65%)' }}
      />
      <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-xl">
        <motion.p variants={fadeInUp} className="text-gradient text-[7rem] font-black leading-none tracking-[-0.05em] md:text-[10rem]">
          {main.code}
        </motion.p>
        <motion.h1 variants={fadeInUp} className="mt-6 text-3xl font-black tracking-tight md:text-4xl">
          {main.headline}
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-5 whitespace-pre-line text-lg leading-relaxed text-white/60">
          {main.body}
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" size="lg">{main.homeButton}</ButtonLink>
          {header?.cta && (
            <ButtonLink to={header.cta.path} variant="outlineDark" size="lg">{header.cta.label}</ButtonLink>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NotFound;
