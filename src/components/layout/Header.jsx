import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, Phone } from 'lucide-react';
import { ButtonLink } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

const SERVICE_PATH = '/service';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { header, footer } = useContent('global');
  const { services } = useContent('serviceDetail');
  const { brand, nav: navItems, cta, menuLabel } = header;
  const serviceItems = services?.items || [];

  // The home hero is a dark video, so before scrolling the transparent header
  // uses white type. Everywhere else (and once scrolled) it is a solid bar.
  const onHero = location.pathname === '/' && !scrolled && !isOpen;
  // 문의하기 is covered by the CTA pill, so it only appears in the mobile sheet.
  const desktopNav = navItems.filter((item) => item.path !== cta?.path);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu on route change.
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock background scroll while the menu is open (pause Lenis too, so the
  // smooth-scroll loop doesn't keep moving the page behind the overlay).
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [isOpen]);

  const linkTone = onHero ? 'text-white/80 hover:text-white' : 'text-text-primary/75 hover:text-text-primary';
  const activeTone = onHero ? 'text-white' : 'text-text-primary';

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-[background-color,border-color,box-shadow,height] duration-500 ${
          onHero
            ? 'h-20 border-b border-transparent bg-transparent md:h-24'
            : 'h-[68px] border-b border-border-primary bg-bg-primary/90 backdrop-blur-xl md:h-[76px]'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center gap-10 px-6">
          <Link to="/" className="relative z-[60] flex shrink-0 items-center" aria-label={brand}>
            <img
              src="/brand/logo.png"
              alt={brand}
              className={`h-8 w-auto transition-[filter] duration-500 md:h-9 ${onHero ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
            {desktopNav.map((item) =>
              item.path === SERVICE_PATH && serviceItems.length > 0 ? (
                <div key={item.path} className="group/menu relative">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                        isActive || location.pathname.startsWith(`${SERVICE_PATH}/`) ? activeTone : linkTone
                      }`
                    }
                  >
                    {item.name}
                    <ChevronDown size={15} className="transition-transform duration-300 group-hover/menu:rotate-180" />
                  </NavLink>
                  {/* Dropdown — pt bridges the hover gap */}
                  <div className="invisible absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:opacity-100">
                    <div className="card-surface rounded-3xl p-2.5">
                      {serviceItems.map((s) => (
                        <Link
                          key={s.id}
                          to={`/service/${s.id}`}
                          className="group/item flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-surface-muted"
                        >
                          <span>
                            <span className="block text-[15px] font-bold text-text-primary">{s.title}</span>
                            <span className="mt-0.5 block text-xs text-text-secondary">{s.subtitle}</span>
                          </span>
                          <ArrowUpRight size={16} className="shrink-0 text-text-secondary transition-colors group-hover/item:text-accent-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${isActive ? activeTone : linkTone}`
                  }
                >
                  {item.name}
                </NavLink>
              )
            )}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {cta && (
              <div className="relative hidden lg:block">
                <ButtonLink to={cta.path}>{cta.label}</ButtonLink>
                {cta.badge && (
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-text-primary px-2.5 py-1.5 text-[11px] font-bold text-white shadow-lg transition-opacity duration-300 before:absolute before:-top-1 before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rotate-45 before:bg-text-primary ${
                      onHero ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    {cta.badge}
                  </span>
                )}
              </div>
            )}

            {/* Menu toggle — below lg */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={menuLabel || 'Toggle navigation'}
              aria-expanded={isOpen}
              className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors lg:hidden ${
                onHero ? 'border-white/25 bg-white/10 backdrop-blur' : 'border-border-primary bg-bg-elevated'
              }`}
            >
              <span className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 block h-[2px] w-[18px] rounded-full transition-all duration-300 ${onHero ? 'bg-white' : 'bg-text-primary'} ${
                    isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] rounded-full transition-all duration-300 ${onHero ? 'bg-white' : 'bg-text-primary'} ${
                    isOpen ? 'bottom-1/2 w-[18px] translate-y-1/2 -rotate-45' : 'bottom-0 w-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet. Sibling of <header> so the header's backdrop-blur can't
          become its containing block. z-40 keeps the header bar on top. */}
      <div
        className={`fixed inset-0 z-40 h-[100dvh] overflow-y-auto bg-bg-primary transition-[opacity,visibility] duration-400 lg:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex min-h-full flex-col px-6 pb-10 pt-24">
          <nav className="flex flex-col" aria-label="모바일 메뉴">
            {navItems.map((item, i) => (
              <div
                key={item.path}
                style={{ transitionDelay: isOpen ? `${60 + i * 40}ms` : '0ms' }}
                className={`border-b border-border-primary transition-all duration-500 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-5 text-[1.35rem] font-black tracking-tight ${
                      isActive ? 'text-accent-secondary' : 'text-text-primary'
                    }`
                  }
                >
                  {item.name}
                  <ArrowUpRight size={20} className="text-text-secondary" />
                </NavLink>
                {item.path === SERVICE_PATH && serviceItems.length > 0 && (
                  <div className="-mt-1 grid grid-cols-2 gap-2 pb-5">
                    {serviceItems.map((s) => (
                      <Link
                        key={s.id}
                        to={`/service/${s.id}`}
                        className="rounded-2xl bg-surface-muted px-4 py-3 text-sm font-bold text-text-primary"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-10">
            {cta && (
              <ButtonLink to={cta.path} size="lg" className="w-full justify-between">
                {cta.label}
                {cta.badge && <span className="ml-2 text-xs font-semibold opacity-70">· {cta.badge}</span>}
              </ButtonLink>
            )}
            {footer?.phone && (
              <a
                href={`tel:${footer.phone.replace(/[^\d]/g, '')}`}
                className="flex items-center justify-center gap-2 rounded-full border border-border-primary py-3.5 text-sm font-bold text-text-primary"
              >
                <Phone size={16} /> {footer.phone.replace(/^Tel:\s*/, '')}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
