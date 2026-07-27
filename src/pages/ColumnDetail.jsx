import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { CTABand, fadeInUp, stagger } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

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
        <header className="border-b border-border-primary bg-bg-secondary pb-16 pt-40">
          <div className="mx-auto max-w-3xl px-6">
            <Link
              to="/column"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent-primary"
            >
              <ArrowLeft size={16} /> {detail.backLabel}
            </Link>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <span className="mb-5 inline-block rounded-full bg-accent-primary/10 px-4 py-1.5 text-xs font-bold text-accent-primary">
                {post.badge}
              </span>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-text-primary md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">{post.desc}</p>
              <time className="mt-6 block text-sm text-text-secondary/70" dateTime={post.date.replace(/\./g, '-')}>
                {post.date}
              </time>
            </motion.div>
          </div>
        </header>

        {/* Body */}
        <div className="py-20">
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mx-auto max-w-3xl space-y-12 px-6"
          >
            {post.sections.map(([heading, paras], i) => (
              <motion.section key={i} variants={fadeInUp}>
                <h2 className="mb-4 text-xl font-black text-text-primary md:text-2xl">{heading}</h2>
                <div className="space-y-5">
                  {(Array.isArray(paras) ? paras : [paras]).map((para, j) => (
                    <p key={j} className="text-lg leading-[1.9] text-text-secondary">{para}</p>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </div>

        {/* Related */}
        {others.length > 0 && (
          <section className="border-t border-border-primary bg-bg-secondary py-20">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="mb-8 text-xl font-black text-text-primary md:text-2xl">{detail.relatedTitle}</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {others.map((it) => (
                  <Link
                    key={it.slug}
                    to={`/column/${it.slug}`}
                    className="group rounded-2xl border border-border-primary bg-bg-elevated p-6 transition-colors hover:border-accent-primary"
                  >
                    <span className="text-xs font-bold text-accent-primary">{it.badge}</span>
                    <h3 className="mt-3 text-base font-bold leading-snug text-text-primary">{it.title}</h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors group-hover:text-accent-primary">
                      {detail.readMore} <ArrowRight size={15} />
                    </span>
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
