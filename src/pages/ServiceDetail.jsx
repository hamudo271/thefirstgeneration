import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { SectionHeader, CTABand, Eyebrow, ButtonLink, fadeInUp, stagger } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

const ServiceDetail = () => {
  const { id } = useParams();
  const { shared, services } = useContent('serviceDetail');
  const { footer } = useContent('global');
  const data = services.items.find((s) => s.id === id);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary text-text-primary">
        <SEO title={shared.notFoundTitle} path={`/service/${id}`} noIndex />
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold">{shared.notFoundTitle}</h2>
          <Link to="/service" className="text-accent-primary hover:underline">{shared.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const others = services.items.filter((s) => s.id !== id);

  const scrollToPricing = (e) => {
    const el = document.getElementById('pricing');
    if (!el) return;
    e.preventDefault();
    if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-bg-primary">
      {/* seoTitle carries the region keyword for search; the visible h1 below stays as-is. */}
      <SEO title={data.seoTitle || data.title} description={data.desc} path={`/service/${id}`} image={data.heroImage} />

      {/* Hero — copy left, image card right */}
      <section className="relative overflow-hidden bg-bg-primary pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="glow-accent absolute inset-0 opacity-80" style={{ '--gx': '8%', '--gy': '-10%' }} />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <nav className="mb-8 flex items-center gap-1.5 text-sm text-text-secondary" aria-label="breadcrumb">
              <Link to="/service" className="transition-colors hover:text-text-primary">{shared.breadcrumb}</Link>
              <ChevronRight size={14} />
              <span className="font-semibold text-text-primary">{data.title}</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Eyebrow>{data.subtitle}</Eyebrow>
            </motion.div>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeInUp}
              className="mt-6 text-[2.5rem] font-black leading-[1.08] tracking-[-0.035em] text-text-primary md:text-6xl lg:text-7xl"
            >
              {data.title}
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.15 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
            >
              {data.desc}
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/contact" size="lg">{shared.ctaButton}</ButtonLink>
              <ButtonLink href="#pricing" onClick={scrollToPricing} variant="outline" size="lg" arrow={false}>
                {shared.pricingHeadline}
              </ButtonLink>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="rounded-[32px] bg-surface-muted p-3 shadow-[var(--shadow-card)]">
              <img src={data.heroImage} alt={data.title} className="aspect-[4/3] w-full rounded-[24px] object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro split */}
      <section className="bg-surface-muted py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-6 lg:grid-cols-12 lg:gap-12">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-[1.9rem] font-black leading-[1.2] tracking-[-0.03em] text-text-primary md:text-[2.6rem] lg:col-span-6"
          >
            {data.introTitle}
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.15 }}
            className="whitespace-pre-line text-lg leading-[1.9] text-text-secondary lg:col-span-6 lg:border-l lg:border-border-primary lg:pl-10"
          >
            {data.introText}
          </motion.p>
        </div>
      </section>

      {/* Who it's for + how it runs — service-specific copy, no shared boilerplate */}
      {(data.forWhom || data.steps) && (
        <section className="bg-bg-primary py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-5 px-6 lg:grid-cols-12">
            {data.forWhom && (
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-white md:p-10 lg:col-span-5"
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(420px circle at 100% 0%, rgba(234,164,0,0.3), transparent 60%)' }}
                  aria-hidden
                />
                <h2 className="relative text-2xl font-black tracking-tight md:text-[1.75rem]">{data.forWhom.title}</h2>
                <ul className="relative mt-8 space-y-4">
                  {data.forWhom.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-[15px] leading-relaxed text-white/80">
                      <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent-soft" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {data.steps && (
              <motion.div
                variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="card-surface rounded-[28px] p-8 md:p-10 lg:col-span-7"
              >
                <motion.h2 variants={fadeInUp} className="text-2xl font-black tracking-tight text-text-primary md:text-[1.75rem]">
                  {data.steps.title}
                </motion.h2>
                <ol className="mt-8 divide-y divide-border-primary">
                  {data.steps.items.map((step, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex gap-5 py-5 first:pt-0 last:pb-0">
                      <span className="text-gradient w-9 shrink-0 text-2xl font-black leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-text-primary md:text-[17px]">{step.t}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">{step.d}</p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 bg-surface-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow={shared.pricingEyebrow} headline={shared.pricingHeadline} center />
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {data.pricing.map((plan, i) => (
              <motion.div key={i} variants={fadeInUp} className="card-surface flex flex-col rounded-[28px] p-8 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black tracking-tight text-text-primary md:text-2xl">{plan.name}</h3>
                  <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-text-secondary">{plan.vat}</span>
                </div>
                <div className="mt-6 border-b border-border-primary pb-7">
                  <span className="text-gradient text-[2.4rem] font-black tracking-tight">{shared.currencySymbol}{plan.price}</span>
                  <span className="ml-1 text-text-secondary">{shared.priceUnit}</span>
                </div>
                <ul className="mb-9 mt-7 flex-grow space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-[15px] text-text-secondary">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-primary" />
                      <span>{feature.value}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink to="/contact" variant="dark" className="w-full justify-between">
                  {shared.inquiryButton}
                </ButtonLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service-specific FAQ — also feeds the FAQPage schema for this route */}
      {data.faq && (
        <section className="bg-bg-primary py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-16">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-[1.9rem] font-black leading-[1.2] tracking-[-0.03em] text-text-primary md:text-[2.6rem] lg:col-span-4"
            >
              {data.faq.title}
            </motion.h2>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3 lg:col-span-8">
              {data.faq.items.map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="rounded-[22px] border border-border-primary bg-bg-elevated p-6 md:p-7">
                  <h3 className="flex gap-3 text-base font-bold text-text-primary md:text-[17px]">
                    <span className="font-black text-accent-secondary">Q.</span>
                    <span>{item.q}</span>
                  </h3>
                  <p className="mt-3 pl-7 text-[15px] leading-[1.85] text-text-secondary">{item.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Other services */}
      {others.length > 0 && (
        <section className="bg-surface-muted py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-xl font-black tracking-tight text-text-primary md:text-2xl">{shared.otherTitle}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {others.map((s) => (
                <Link key={s.id} to={`/service/${s.id}`} className="card-surface group flex items-center gap-4 rounded-[24px] p-3 pr-5">
                  <span className="h-20 w-24 shrink-0 overflow-hidden rounded-[18px] bg-surface-muted">
                    <img src={s.heroImage} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-accent-secondary">{s.subtitle}</span>
                    <span className="mt-1 block truncate text-base font-bold text-text-primary">{s.title}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-text-secondary transition-colors group-hover:text-accent-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        headline={shared.ctaHeadline} subhead={shared.ctaSubhead} button={shared.ctaButton}
        secondary={footer?.ctaSecondary} secondaryTo={footer?.ctaSecondaryPath}
      />
    </div>
  );
};

export default ServiceDetail;
