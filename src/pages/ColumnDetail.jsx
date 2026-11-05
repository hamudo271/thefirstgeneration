import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import ColumnCover from '../components/common/ColumnCover.jsx';
import { CTABand, Eyebrow, fadeInUp, stagger } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

// Korean reading speed ≈ 500 characters per minute.
const readingMinutes = (sections = []) => {
  const chars = sections
    .flatMap(([h, paras]) => [h, ...(Array.isArray(paras) ? paras : [paras])])
    .join('').length;
  return Math.max(1, Math.round(chars / 500));
};

const jumpTo = (id) => (e) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  if (window.lenis) window.lenis.scrollTo(el, { offset: -100 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

// One article per URL (/column/:slug). Splitting the column list into
// individual pages is what lets each piece rank on its own long-tail terms —
// on a single /column page they all competed as one document.
const ColumnDetail = () => {
  const { slug } = useParams();
  const { list, detail } = useContent('column');
  const { footer } = useContent('global');

  const index = list.items.findIndex((it) => it.slug === slug);
  const post = index >= 0 ? list.items[index] : null;

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-black text-text-primary">{detail.notFoundTitle}</h1>
          <Link to="/column" className="text-accent-primary hover:underline">{detail.backLabel}</Link>
        </div>
      </div>
    );
  }

  const others = list.items.filter((_, i) => i !== index).slice(0, 3);
  const minutes = readingMinutes(post.sections);

  return (
    <div className="bg-bg-primary">
      <SEO
        title={post.title}
        description={post.desc}
        path={`/column/${post.slug}`}
        type="article"
      />

      <article>
        {/* Header */}
        <header className="relative overflow-hidden bg-bg-primary pb-14 pt-32 md:pb-20 md:pt-40">
          <div className="glow-accent absolute inset-0 opacity-70" style={{ '--gx': '10%', '--gy': '-10%' }} />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="lg:w-[calc(75%-0.75rem)]">
              <Link
                to="/column"
                className="mb-10 inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-elevated px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
              >
                <ArrowLeft size={15} /> {detail.backLabel}
              </Link>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <Eyebrow>{post.badge}</Eyebrow>
                <h1 className="mt-6 text-[2.1rem] font-black leading-[1.18] tracking-[-0.03em] text-text-primary md:text-[3.4rem]">
                  {post.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">{post.desc}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border-primary pt-6 text-sm text-text-secondary">
                  <time dateTime={post.date.replace(/\./g, '-')}>{post.date}</time>
                  <span className="h-1 w-1 rounded-full bg-border-primary" aria-hidden />
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {minutes}{detail.readingUnit}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Body + sticky table of contents */}
        <div className="bg-bg-primary pb-24 md:pb-32">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12">
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-14 lg:col-span-8"
            >
              {post.sections.map(([heading, paras], i) => (
                <motion.section key={i} id={`sec-${i + 1}`} variants={fadeInUp} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 text-xl font-black tracking-tight text-text-primary md:text-[1.6rem]">
                    <span className="text-base font-black tabular-nums text-accent-secondary">{String(i + 1).padStart(2, '0')}</span>
                    {heading}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {(Array.isArray(paras) ? paras : [paras]).map((para, j) => (
                      <p key={j} className="text-[17px] leading-[1.95] text-text-primary/75">{para}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </motion.div>

            <aside className="hidden lg:col-span-4 lg:block">
              <nav className="sticky top-28 rounded-[24px] border border-border-primary bg-surface-muted p-6" aria-label={detail.tocLabel}>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">{detail.tocLabel}</p>
                <ol className="space-y-1">
                  {post.sections.map(([heading], i) => (
                    <li key={i}>
                      <a
                        href={`#sec-${i + 1}`}
                        onClick={jumpTo(`sec-${i + 1}`)}
                        className="flex gap-3 rounded-xl px-3 py-2.5 text-sm leading-snug text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
                      >
                        <span className="font-bold tabular-nums text-accent-secondary">{String(i + 1).padStart(2, '0')}</span>
                        <span>{heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          </div>
        </div>

        {/* Related */}
        {others.length > 0 && (
          <section className="bg-surface-muted py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-8 text-2xl font-black tracking-tight text-text-primary md:text-[2rem]">{detail.relatedTitle}</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {others.map((it) => (
                  <Link key={it.slug} to={`/column/${it.slug}`} className="card-surface group flex flex-col overflow-hidden rounded-[28px] p-3">
                    <ColumnCover badge={it.badge} title={it.title} className="aspect-[16/10] rounded-[20px]" />
                    <div className="px-3 pb-3 pt-5">
                      <h3 className="text-base font-bold leading-snug text-text-primary transition-colors group-hover:text-accent-secondary md:text-lg">
                        {it.title}
                      </h3>
                      <span className="mt-4 inline-block text-sm font-bold text-accent-secondary">{detail.readMore} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTABand
        headline={footer?.ctaHeadline ?? detail.ctaHeadline}
        subhead={detail.ctaSubhead}
        button={detail.ctaButton}
      />
    </div>
  );
};

export default ColumnDetail;
