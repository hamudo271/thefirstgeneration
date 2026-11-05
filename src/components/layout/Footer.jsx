import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from '../common/SocialLinks.jsx';
import { ButtonLink } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// "Tel: 010-…" / "E-mail: …" → the bare value (labels are rendered separately).
const bare = (v = '') => v.replace(/^[^:]+:\s*/, '');

const Footer = () => {
  const { footer } = useContent('global');
  const { services } = useContent('serviceDetail');
  const {
    brand,
    tagline,
    ctaButton,
    ctaSecondary,
    ctaSecondaryPath,
    servicesLabel,
    menu = [],
    socials = [],
    addressLabel,
    address,
    contactLabel,
    phone,
    email,
    businessName,
    businessNumber,
    copyright,
    termsLink,
    termsPath,
    privacyLink,
    privacyPath,
  } = footer;

  const groups = [
    servicesLabel && services?.items?.length
      ? { title: servicesLabel, links: services.items.map((s) => ({ name: s.title, path: `/service/${s.id}` })) }
      : null,
    ...menu,
  ].filter(Boolean);

  return (
    <footer className="bg-ink text-white/55">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top: brand + menus + CTAs */}
        <div className="grid gap-12 border-b border-white/10 py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <img src="/brand/logo.png" alt={brand} className="h-9 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs whitespace-pre-line text-sm leading-relaxed">{tagline}</p>
            <SocialLinks socials={socials} tone="light" className="mt-7" />
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5" aria-label="푸터 메뉴">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="mb-4 text-sm font-bold text-white">{g.title}</h3>
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.path}>
                      <Link to={l.path} className="text-sm transition-colors hover:text-white">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:justify-end">
            {ctaSecondary && (
              <ButtonLink to={ctaSecondaryPath} variant="outlineDark" arrow={false}>
                {ctaSecondary}
              </ButtonLink>
            )}
            <ButtonLink to="/contact">{ctaButton}</ButtonLink>
          </div>
        </div>

        {/* Bottom: business info */}
        <div className="grid gap-8 py-10 text-[13px] leading-relaxed lg:grid-cols-12">
          <dl className="grid gap-x-10 gap-y-2.5 sm:grid-cols-[auto_1fr] lg:col-span-7">
            <dt className="font-bold text-white/85">{contactLabel}</dt>
            <dd className="flex flex-wrap gap-x-5 gap-y-1">
              {phone && (
                <a href={`tel:${bare(phone).replace(/[^\d]/g, '')}`} className="hover:text-white">
                  {bare(phone)}
                </a>
              )}
              {email && (
                <a href={`mailto:${bare(email)}`} className="hover:text-white">
                  {bare(email)}
                </a>
              )}
            </dd>
            <dt className="font-bold text-white/85">{addressLabel}</dt>
            <dd>{address}</dd>
          </dl>
          <div className="space-y-2.5 lg:col-span-5 lg:text-right">
            <p>{businessName}</p>
            <p>{businessNumber}</p>
            <div className="flex gap-5 pt-1 lg:justify-end">
              <Link to={termsPath} className="transition-colors hover:text-white">{termsLink}</Link>
              <Link to={privacyPath} className="font-bold text-white/85 transition-colors hover:text-white">{privacyLink}</Link>
            </div>
            <p className="text-white/35">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
