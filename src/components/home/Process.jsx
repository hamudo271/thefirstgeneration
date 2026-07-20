import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, stagger } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Process — horizontal step timeline (DCD-style): connecting line + dots,
// big faded numbers, title + short description. Single row on desktop,
// auto-wrapping grid on smaller screens.
const Process = () => {
  const { process } = useContent('home');
  const steps = process.steps;

  return (
    <section className="bg-bg-primary py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl md:mb-20">
          <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-accent-primary">
            {process.eyebrow}
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text-primary md:text-5xl">
            고객 만족도를 최우선합니다
          </h2>
          <p className="mt-5 text-text-secondary">
            상담부터 완성까지, 더퍼스트제너레이션의 체계적인 {steps.length}단계 작업 프로세스.
          </p>
          <Link
            to="/contact"
            className="bg-brand-gradient mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white shadow-lg shadow-accent-primary/30 transition-transform hover:scale-105"
          >
            상담 신청하기 <ArrowRight size={18} />
          </Link>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop only, runs through the dots) */}
          <div className="absolute inset-x-0 top-[6px] hidden h-px bg-border-primary lg:block" />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7"
          >
            {steps.map((item, i) => (
              <motion.div key={item.step} variants={fadeInUp} className="relative">
                <div className="mb-8 hidden h-3 w-3 rounded-full border-2 border-border-primary bg-bg-primary lg:block" />
                <span className="block text-4xl font-black leading-none text-text-primary/15 md:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-base font-bold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
