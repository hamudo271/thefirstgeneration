import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Users, BarChart3, Sparkles, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import { PageHero, SectionHeader, CTABand, fadeInUp, stagger } from '../components/common/ui.jsx';
import CreatorGrid from '../components/common/CreatorGrid.jsx';
import CreatorData from '../components/common/CreatorData.jsx';
import { useContent } from '../context/ContentContext.jsx';

const teamIcons = [Target, Zap, Users, BarChart3];
const valueIcons = [Sparkles, Lightbulb];

const Company = () => {
  const { seo, hero, whyObsessed, teamwork, team, cta, figures } = useContent('company');
  // 크리에이터 명단은 home.partners가 단일 소스 (FaqAccordion이 home.faq를 읽는 것과 동일 패턴)
  const { partners } = useContent('home');
  const { footer } = useContent('global');

  const valueCards = [
    { title: whyObsessed.card1Title, strong: whyObsessed.card1Strong, body: whyObsessed.card1Body },
    { title: whyObsessed.card2Title, strong: whyObsessed.card2Strong, body: whyObsessed.card2Body },
  ];

  return (
    <div className="bg-bg-primary">
      <SEO title={seo.title} description={seo.description} path="/company" />

      <PageHero eyebrow={hero.eyebrow} title={hero.headline} accent="결과" subhead={hero.subhead}>
        {/* Key figures — label / oversized number / one-line note, split by hairlines */}
        {figures?.length > 0 && (
          <motion.dl
            variants={stagger} initial="hidden" animate="visible"
            className="mt-16 grid grid-cols-1 border-t border-text-primary sm:grid-cols-2 md:mt-24 lg:grid-cols-4"
          >
            {figures.map((f, i) => (
              <motion.div
                key={f.label} variants={fadeInUp}
                className={`border-b border-border-primary py-8 sm:pr-8 lg:border-b-0 lg:py-10 ${
                  i % 2 === 1 ? 'sm:border-l sm:pl-8' : ''
                } ${i > 0 ? 'lg:border-l lg:pl-8' : ''}`}
              >
                <dt className="text-sm font-bold text-text-secondary">{f.label}</dt>
                <dd>
                  <span className="mt-3 block text-[3.2rem] font-black leading-none tracking-[-0.04em] text-text-primary md:text-[3.8rem]">
                    {f.value}
                  </span>
                  <span className="mt-4 block text-[15px] leading-relaxed text-text-secondary">{f.desc}</span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        )}
      </PageHero>

      {/* Why obsessed — core values */}
      <section className="bg-surface-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader split headline={whyObsessed.headline} accent="집착" subhead={whyObsessed.subhead} />
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {valueCards.map((c, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <motion.div key={i} variants={fadeInUp} className="card-surface rounded-[28px] p-8 md:p-10">
                  <span className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_12px_24px_-12px_rgba(234,164,0,0.9)]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-7 text-2xl font-black tracking-tight text-text-primary">{c.title}</h3>
                  <p className="mt-4 text-[17px] font-bold leading-relaxed text-text-primary">{c.strong}</p>
                  <p className="mt-3 leading-[1.85] text-text-secondary">{c.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Teamwork statement */}
      <section className="relative overflow-hidden bg-bg-primary py-24 md:py-32">
        <div className="glow-accent absolute inset-0 opacity-70" style={{ '--gx': '85%', '--gy': '20%' }} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-12 lg:gap-12">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-[2rem] font-black leading-[1.15] tracking-[-0.03em] text-text-primary md:text-5xl lg:col-span-6"
          >
            {teamwork.headline}
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="whitespace-pre-line text-lg leading-[1.9] text-text-secondary lg:col-span-6 lg:border-l lg:border-border-primary lg:pl-10"
          >
            {teamwork.subhead}
          </motion.p>
        </div>
      </section>

      {/* Creator roster (소속 유튜버/인플루언서 목록) */}
      <section className="bg-surface-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader split eyebrow={partners.eyebrow} headline={partners.headline} accent={partners.accent} subhead={partners.subhead} />
          <CreatorData items={partners.items} labels={partners.data} />
          <CreatorGrid items={partners.items} />
        </div>
      </section>

      {/* Team roles */}
      <section className="bg-bg-primary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader split eyebrow={team.eyebrow} headline={team.headline} accent="최고의 팀" />
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          >
            {team.members.map((member, i) => {
              const Icon = teamIcons[i % teamIcons.length];
              return (
                <motion.div key={i} variants={fadeInUp} className="card-surface rounded-[28px] p-7 md:p-8">
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        i % 2 === 0 ? 'bg-brand-gradient' : 'bg-text-primary text-white'
                      }`}
                    >
                      <Icon size={22} />
                    </span>
                    <span className="text-[2.4rem] font-black leading-none text-text-primary/[0.07]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-black tracking-tight text-text-primary">{member.role}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{member.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTABand
        headline={cta.headline} subhead={cta.subhead} button={cta.button}
        secondary={footer?.ctaSecondary} secondaryTo={footer?.ctaSecondaryPath}
      />
    </div>
  );
};

export default Company;
