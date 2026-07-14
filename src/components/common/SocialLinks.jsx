import React from 'react';
import { Instagram, Youtube } from 'lucide-react';

// Shared social icon links (Instagram, YouTube, Naver Blog).
// Used by Footer, Contact page, and the home FinalCta.
// `tone`: 'light' for dark backgrounds (white icons), 'dark' for light backgrounds.
const SocialLinks = ({ socials = [], tone = 'dark', className = '' }) => {
  if (!socials.length) return null;
  const base =
    tone === 'light'
      ? 'border-white/25 text-white hover:border-white hover:bg-white/10'
      : 'border-border-primary text-text-secondary hover:border-accent-primary hover:text-accent-primary';
  return (
    <div className={`flex gap-3 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.type}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${base}`}
        >
          {social.type === 'instagram' && <Instagram size={19} />}
          {social.type === 'youtube' && <Youtube size={19} />}
          {social.type === 'naver' && <span className="text-xs font-black">blog</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
