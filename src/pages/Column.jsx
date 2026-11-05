import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import ColumnCover from '../components/common/ColumnCover.jsx';
import { PageHero, CTABand, fadeInUp, stagger } from '../components/common/ui.jsx';
import { useContent } from '../context/ContentContext.jsx';

const Column = () => {
  const { seo, hero, list } = useContent('column');
  const [featured, ...rest] = list.items;

  return (
    <div className="bg-bg-primary">
      <SEO title={seo.title} description={seo.description} path="/column" />

      <PageHero eyebrow={hero.eyebrow} title={hero.headline} accent="인사이트" subhead={hero.subhead} />

      <section className="bg-surface-muted py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {list.intro && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mb-12 max-w-3xl space-y-5 md:mb-16"
            >
              {list.intro.map((para, i) => (
                <p key={i} className="text-lg leading-[1.9] text-text-secondary">{para}</p>
              ))}
            </motion.div>
          )}

          {/* Featured (latest) */}
          {featured && (
            <motion.article initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-5">
              <Link
                to={`/column/${featured.slug}`}
                className="card-surface group grid overflow-hidden rounded-[32px] p-3 lg:grid-cols-12"
              >
                <ColumnCover badge={featured.badge} title={featured.title} size="lg" className="aspect-[16/10] rounded-[24px] lg:col-span-7 lg:aspect-auto lg:min-h-[380px]" />
                <div className="flex flex-col px-5 pb-5 pt-7 md:px-8 lg:col-span-5 lg:py-10 lg:pl-10">
                  <time className="text-sm text-text-secondary" dateTime={featured.date.replace(/\./g, '-')}>{featured.date}</time>
                  <h2 className="mt-3 text-2xl font-black leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent-secondary md:text-[1.9rem]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 leading-[1.85] text-text-secondary">{featured.desc}</p>
                  <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-bold text-text-primary">
                    {list.readMore.replace(/\s*→$/, '')}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowUpRight size={15} />
                    </span>
                  </span>
                </div>
              </Link>
            </motion.article>
          )}

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((item) => (
              <motion.article key={item.slug} variants={fadeInUp}>
                <Link to={`/column/${item.slug}`} className="card-surface group flex h-full flex-col overflow-hidden rounded-[28px] p-3">
                  <ColumnCover badge={item.badge} title={item.title} className="aspect-[16/10] rounded-[20px]" />
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                    <time className="text-[13px] text-text-secondary" dateTime={item.date.replace(/\./g, '-')}>{item.date}</time>
                    <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent-secondary">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-2 text-[15px] leading-relaxed text-text-secondary">{item.desc}</p>
                    <span className="mt-auto pt-6 text-sm font-bold text-accent-secondary">{list.readMore}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABand
        headline={'더 궁금한 점이\n있으신가요?'}
        subhead="더퍼스트제너레이션이 직접 답해드립니다. 지금 문의해보세요."
        button="문의하기"
      />
    </div>
  );
};

export default Column;
