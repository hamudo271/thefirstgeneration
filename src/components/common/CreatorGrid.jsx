import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, ArrowUpRight } from 'lucide-react';
import { fadeInUp, stagger } from './ui.jsx';

// Creator profile grid — shared by home Partners section and Company page.
// Items come from home.partners.items: { name, channel, followers, desc, href, image? }.
// href가 있으면 카드 클릭 시 해당 채널 새 탭으로 이동. image가 있으면 실제 프로필 사진,
// 없으면 브랜드 그라데이션 모노그램으로 폴백.

// channel 값 → 플랫폼 메타(아이콘 / 팔로워 표기 / 브랜드 컬러) 매핑.
const PLATFORMS = {
  유튜브: { Icon: Youtube, label: '구독자', color: '#FF0000' },
  인스타: { Icon: Instagram, label: '팔로워', color: '#E4405F' },
  팔로워: { Icon: Instagram, label: '팔로워', color: '#E4405F' },
};
const platformOf = (channel) => PLATFORMS[channel] || PLATFORMS['팔로워'];

const CreatorCard = ({ creator }) => {
  const { Icon, label, color } = platformOf(creator.channel);
  const initial = creator.name.replace(/^@/, '').charAt(0);

  const inner = (
    <>
      <div className="flex items-start justify-between">
        {/* Avatar + platform badge */}
        <div className="relative h-14 w-14 shrink-0">
          <div className="h-full w-full overflow-hidden rounded-full ring-1 ring-border-primary">
            {creator.image ? (
              <img src={creator.image} alt={creator.name} loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <div className="bg-brand-gradient flex h-full w-full items-center justify-center text-xl font-black">
                {initial}
              </div>
            )}
          </div>
          <span
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-border-primary bg-white shadow-sm"
            aria-hidden
          >
            <Icon size={12} color={color} />
          </span>
        </div>
        {creator.href && (
          <ArrowUpRight
            size={18}
            className="text-text-secondary/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-primary"
          />
        )}
      </div>

      <h3 className="mt-5 truncate text-[15px] font-bold tracking-tight text-text-primary">{creator.name}</h3>
      <p className="mt-1 truncate text-[13px] text-text-secondary">{creator.desc}</p>

      <div className="mt-4 flex items-center justify-between border-t border-border-primary pt-3.5 text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="font-bold tabular-nums text-text-primary">{creator.followers}</span>
      </div>
    </>
  );

  const className =
    'card-surface group block h-full rounded-[24px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/40';

  return creator.href ? (
    <a href={creator.href} target="_blank" rel="noopener noreferrer" className={className} title={`${creator.name} 채널 바로가기`}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
};

const CreatorGrid = ({ items }) => (
  <motion.div
    variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-5"
  >
    {items.map((creator, i) => (
      <motion.div key={i} variants={fadeInUp}>
        <CreatorCard creator={creator} />
      </motion.div>
    ))}
  </motion.div>
);

export default CreatorGrid;
