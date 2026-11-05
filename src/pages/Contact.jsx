import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import { Eyebrow, Accented, fadeInUp } from '../components/common/ui.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import SocialLinks from '../components/common/SocialLinks.jsx';
import { useContent } from '../context/ContentContext.jsx';

// Is the studio open right now (Asia/Seoul)? `hours` = { days:[1..5], open, close }.
const isOpenNow = (hours) => {
  if (!hours) return false;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul', weekday: 'short', hour: 'numeric', hour12: false,
  }).formatToParts(new Date());
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find((p) => p.type === 'weekday')?.value);
  const h = Number(parts.find((p) => p.type === 'hour')?.value) % 24;
  return hours.days.includes(wd) && h >= hours.open && h < hours.close;
};

const Badge = ({ children, tone }) => (
  <span
    className={`ml-2 rounded-md px-1.5 py-0.5 align-middle text-[10px] font-bold ${
      tone === 'required' ? 'bg-accent-primary/12 text-accent-secondary' : 'bg-surface-muted text-text-secondary'
    }`}
  >
    {children}
  </span>
);

const Field = ({ label, htmlFor, required, optionalBadge, children, className = '' }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-2.5 block text-sm font-bold text-text-primary">
      {label}
      {required ? <span className="ml-0.5 text-accent-primary">*</span> : optionalBadge && <Badge>{optionalBadge}</Badge>}
    </label>
    {children}
  </div>
);

// Single-choice chips backed by real radio inputs (so FormData + native
// `required` validation behave exactly like the old <select>).
const ChoiceChips = ({ name, label, options, required }) => (
  <fieldset>
    <legend className="mb-3 block text-sm font-bold text-text-primary">
      {label}
      {required && <span className="ml-0.5 text-accent-primary">*</span>}
    </legend>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o.value} className="relative">
          <input
            type="radio" name={name} value={o.value} required={required}
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-xl opacity-0"
          />
          <span className="flex items-center gap-1.5 rounded-xl border border-border-primary bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-text-secondary transition-all peer-hover:border-text-primary/40 peer-checked:border-text-primary peer-checked:bg-text-primary peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-accent-primary/25">
            {o.label}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);

const StepTitle = ({ n, title }) => (
  <div className="mb-7 flex items-center gap-3 border-b border-border-primary pb-4">
    <span className="text-sm font-black tabular-nums text-accent-secondary">{String(n).padStart(2, '0')}</span>
    <h3 className="text-lg font-black tracking-tight text-text-primary">{title}</h3>
  </div>
);

// Contact details card (email/phone links + socials). Rendered in the sticky
// aside on desktop and below the form on mobile, so the form comes first there.
const InfoList = ({ items, socials, className = '' }) => (
  <dl className={`divide-y divide-border-primary rounded-[28px] border border-border-primary bg-bg-elevated px-7 ${className}`}>
    {items.map((item) => (
      <div key={item.title} className="py-5">
        <dt className="text-xs font-semibold text-text-secondary">{item.title}</dt>
        <dd className="mt-1.5 text-[15px] font-bold text-text-primary">
          {item.title === 'Phone' ? (
            <a href={`tel:${item.value.replace(/[^\d]/g, '')}`} className="hover:text-accent-secondary">{item.value}</a>
          ) : item.title === 'Email' ? (
            <a href={`mailto:${item.value}`} className="break-all hover:text-accent-secondary">{item.value}</a>
          ) : (
            item.value
          )}
        </dd>
      </div>
    ))}
    <div className="py-5">
      <SocialLinks socials={socials} tone="dark" />
    </div>
  </dl>
);

const Contact = () => {
  const { seo, hero, info, form, aside } = useContent('contact');
  const { footer } = useContent('global');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(null); // null until computed on the client

  useEffect(() => {
    const tick = () => setOpen(isOpenNow(aside?.hours));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [aside]);

  // Auto-format a Korean mobile number as 010-XXXX-XXXX while typing (max 11 digits).
  const formatPhone = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length < 4) return d;
    if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError('');
    if (!fd.get('consent')) {
      setError('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    const payload = Object.fromEntries(fd.entries());
    payload.consent = true;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || '전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const steps = form.steps || [];

  return (
    <div className="bg-bg-primary">
      <SEO title={seo.title} description={seo.description} path="/contact" />

      {/* Header */}
      <section className="relative overflow-hidden bg-bg-primary pb-14 pt-36 md:pb-20 md:pt-44">
        <div className="glow-accent absolute inset-0 opacity-80" style={{ '--gx': '8%', '--gy': '-10%' }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Contact</Eyebrow>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeInUp}
            className="mt-6 text-[2.8rem] font-black leading-[1.05] tracking-[-0.04em] text-text-primary md:text-7xl lg:text-8xl"
          >
            <Accented text={hero.headline} accent="Us" />
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.12 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
          >
            {aside ? (
              <>
                {aside.lead} <strong className="font-bold text-text-primary">{aside.leadStrong}</strong>
                {aside.leadTail} {hero.subhead}
              </>
            ) : (
              hero.subhead
            )}
          </motion.p>
        </div>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-14">
          {/* Aside */}
          <motion.aside
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="lg:col-span-4"
          >
            <div className="space-y-6 lg:sticky lg:top-28">
              {aside && (
                <div className="rounded-[28px] bg-ink p-7 text-white md:p-8">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white/75">
                    <span className="relative flex h-2.5 w-2.5">
                      {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />}
                      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? 'bg-green-400' : 'bg-white/30'}`} />
                    </span>
                    {open === null ? ' ' : open ? aside.openLabel : aside.closedLabel}
                  </p>
                  <h2 className="mt-5 whitespace-pre-line text-2xl font-black leading-snug tracking-tight">{aside.headline}</h2>
                  <ul className="mt-7 space-y-3.5">
                    {aside.promises.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-white/85">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary/20 text-accent-soft">
                          <Check size={14} strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <InfoList items={info.items} socials={footer?.socials} className="hidden lg:block" />
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="lg:col-span-8"
          >
            <div className="rounded-[32px] border border-border-primary bg-bg-elevated p-6 shadow-[var(--shadow-card)] md:p-10">
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-black tracking-tight text-text-primary md:text-[1.75rem]">{form.sectionTitle}</h2>
                <span className="hidden text-xs text-text-secondary sm:block">
                  <span className="text-accent-primary">*</span> {form.requiredBadge}
                </span>
              </div>
              <div className="mb-10 mt-5 flex items-start gap-2.5 rounded-2xl bg-accent-primary/[0.08] p-4 text-sm leading-relaxed text-text-secondary">
                <Info size={17} className="mt-0.5 shrink-0 text-accent-secondary" />
                <p>{form.notice}</p>
              </div>

              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center rounded-[24px] bg-surface-muted px-6 py-20 text-center">
                  <div className="bg-brand-gradient mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="mb-2 text-2xl font-black text-text-primary">{aside?.sentTitle || '문의가 접수되었습니다'}</h3>
                  <p className="text-text-secondary">{aside?.sentBody}</p>
                </div>
              ) : (
                <form className="space-y-12" onSubmit={handleSubmit}>
                  {/* Honeypot (spam trap) — hidden from real users */}
                  <input
                    type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  {/* 01 — basic info */}
                  <div>
                    <StepTitle n={1} title={steps[0]} />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Field label={form.brandLabel} htmlFor="f-brand" required>
                        <input id="f-brand" name="brand" required type="text" className="input-filled" placeholder={form.brandPlaceholder} />
                      </Field>
                      <Field label={form.managerLabel} htmlFor="f-manager" required>
                        <input id="f-manager" name="manager" required type="text" className="input-filled" placeholder={form.managerPlaceholder} />
                      </Field>
                      <Field label={form.positionLabel} htmlFor="f-position" optionalBadge={form.optionalBadge}>
                        <input id="f-position" name="position" type="text" className="input-filled" placeholder={form.positionPlaceholder} />
                      </Field>
                      <Field label={form.phoneLabel} htmlFor="f-phone" required>
                        <input
                          id="f-phone" name="phone" required type="tel" inputMode="numeric" maxLength={13}
                          value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
                          className="input-filled" placeholder={form.phonePlaceholder}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* 02 — channel info */}
                  <div>
                    <StepTitle n={2} title={steps[1]} />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Field label={form.channelLabel} htmlFor="f-channel" required>
                        <input id="f-channel" name="channel" required type="url" className="input-filled" placeholder={form.channelPlaceholder} />
                      </Field>
                      <Field label={form.benchLabel} htmlFor="f-bench" required>
                        <input id="f-bench" name="bench" required type="url" className="input-filled" placeholder={form.benchPlaceholder} />
                      </Field>
                      <Field label={form.bizLabel} htmlFor="f-biz" required className="md:col-span-2">
                        <textarea id="f-biz" name="biz" required rows="3" className="input-filled resize-none" placeholder={form.bizPlaceholder} />
                      </Field>
                    </div>
                  </div>

                  {/* 03 — request */}
                  <div>
                    <StepTitle n={3} title={steps[2]} />
                    <div className="space-y-8">
                      <ChoiceChips name="service" label={form.serviceLabel} options={form.serviceOptions} required />
                      <ChoiceChips name="budget" label={form.budgetLabel} options={form.budgetOptions} required />
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Field label={form.reasonLabel} htmlFor="f-reason" required>
                          <textarea id="f-reason" name="reason" required rows="3" className="input-filled resize-none" placeholder={form.reasonPlaceholder} />
                        </Field>
                        <Field label={form.goalLabel} htmlFor="f-goal" required>
                          <textarea id="f-goal" name="goal" required rows="3" className="input-filled resize-none" placeholder={form.goalPlaceholder} />
                        </Field>
                      </div>
                      <Field label={form.sourceLabel} htmlFor="f-source" required>
                        <div className="relative">
                          <select id="f-source" name="source" required className="input-filled appearance-none pr-11" defaultValue="">
                            <option value="" disabled>{form.sourcePlaceholder}</option>
                            {form.sourceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                          <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                        </div>
                      </Field>
                    </div>
                  </div>

                  <div className="space-y-5 border-t border-border-primary pt-8">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary">
                      <input name="consent" type="checkbox" className="h-5 w-5 rounded border-border-primary accent-[var(--accent-primary)]" />
                      <span>
                        <span className="font-bold text-accent-secondary">[{form.requiredBadge}]</span> {form.consentLabel}
                      </span>
                    </label>

                    {error && (
                      <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-text-primary py-[1.1rem] text-base font-bold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <><Loader2 size={18} className="animate-spin" /> <span>전송 중...</span></>
                      ) : (
                        <><span>{form.submitButton}</span> <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></>
                      )}
                    </button>
                    {form.submitNote && <p className="text-center text-xs text-text-secondary">{form.submitNote}</p>}
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          <InfoList items={info.items} socials={footer?.socials} className="lg:hidden" />
        </div>
      </section>

      <FaqAccordion className="bg-surface-muted py-24 md:py-32" showCta={false} />
    </div>
  );
};

export default Contact;
