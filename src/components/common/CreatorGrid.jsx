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
      {/* Avatar + platform badge */}
      <div className="relative mx-auto mb-4 h-20 w-20">
        <div className="h-full w-full overflow-hidden rounded-full ring-2 ring-border-primary transition-all duration-300 group-hover:ring-accent-primary">
          {creator.image ? (
            <img
              src={creator.image}
              alt={creator.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-brand-gradient flex h-full w-full items-center justify-center text-2xl font-black text-white">
              {initial}
            </div>
          )}
        </div>
        <div
          className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-border-primary bg-white shadow-sm transition-transform duration-300 group-hover:scale-110"
          aria-hidden
        >
          <Icon size={14} color={color} />
        </div>
        {creator.href && (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Name + category */}
      <h3 className="truncate text-sm font-bold text-text-primary">{creator.name}</h3>
      <p className="mt-0.5 truncate text-xs text-text-secondary">{creator.desc}</p>

      {/* Follower pill */}
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border-primary bg-bg-primary px-3 py-1 text-[11px]">
        <span className="text-text-secondary">{label}</span>
        <span className="font-bold text-text-primary">{creator.followers}</span>
      </div>
    </>
  );

  const className =
    'group block h-full rounded-2xl border border-border-primary bg-bg-elevated px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary hover:shadow-lg hover:shadow-accent-primary/10';

  return creator.href ? (
    <a
      href={creator.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={`${creator.name} 채널 바로가기`}
    >
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
};

const CreatorGrid = ({ items }) => (
  <motion.div
    variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
  >
    {items.map((creator, i) => (
      <motion.div key={i} variants={fadeInUp} whileHover={{ y: -2 }}>
        <CreatorCard creator={creator} />
      </motion.div>
    ))}
  </motion.div>
);

export default CreatorGrid;
