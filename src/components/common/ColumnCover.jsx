import React from 'react';

/**
 * Typographic cover for a column article (no photo needed): ink panel, gold
 * glow, category badge and the title set large. `size="lg"` for the featured
 * card, default for grid cards.
 */
const ColumnCover = ({ badge, title, size = 'md', className = '' }) => (
  <div aria-hidden className={`relative overflow-hidden bg-ink ${className}`}>
    <div
      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
      style={{
        background:
          'radial-gradient(420px circle at 0% 0%, rgba(234,164,0,0.38), transparent 60%), radial-gradient(360px circle at 100% 100%, rgba(180,119,10,0.32), transparent 60%)',
      }}
    />
    <div className="dot-grid absolute inset-0 opacity-30" />
    <div className={`relative flex h-full flex-col justify-between ${size === 'lg' ? 'p-8 md:p-12' : 'p-6 md:p-7'}`}>
      <span className="self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-accent-soft backdrop-blur">
        {badge}
      </span>
      <p
        className={`line-clamp-3 font-black leading-[1.25] tracking-[-0.02em] text-white ${
          size === 'lg' ? 'text-2xl md:text-[2.2rem]' : 'text-lg md:text-xl'
        }`}
      >
        {title}
      </p>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">The First Generation</span>
    </div>
  </div>
);

export default ColumnCover;
