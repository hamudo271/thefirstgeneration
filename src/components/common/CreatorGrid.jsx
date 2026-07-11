import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from './ui.jsx';

// Creator profile grid — shared by home Partners section and Company page.
// Items come from home.partners.items: { name, channel, followers, desc, href }.
// href가 있으면 카드 클릭 시 해당 채널 새 탭으로 이동.
const CreatorCard = ({ creator }) => {
  const initial = creator.name.replace(/^@/, '').charAt(0);
  const inner = (
    <>
      <div className="bg-brand-gradient mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-black text-white">
        {initial}
      </div>
      <h3 className="mb-1 truncate text-sm font-bold text-text-primary">{creator.name}</h3>
      <p className="mb-1 text-xs font-semibold text-accent-primary">
        {creator.channel} {creator.followers}
      </p>
      <p className="truncate text-xs text-text-secondary">{creator.desc}</p>
    </>
  );
  const className =
    'block rounded-2xl border border-border-primary bg-bg-elevated px-4 py-6 text-center transition-colors hover:border-accent-primary';
  return creator.href ? (
    <a href={creator.href} target="_blank" rel="noopener noreferrer" className={className} title={`${creator.name} 채널 바로가기`}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
};

const CreatorGrid = ({ items }) => (
  <motion.div
    variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
  >
    {items.map((creator, i) => (
      <motion.div key={i} variants={fadeInUp}>
        <CreatorCard creator={creator} />
      </motion.div>
    ))}
  </motion.div>
);

export default CreatorGrid;
