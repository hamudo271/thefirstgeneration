import React from 'react';
import CreatorGrid from '../common/CreatorGrid.jsx';
import { SectionHeader, TextLink } from '../common/ui.jsx';
import { useContent } from '../../context/ContentContext.jsx';

// Creator roster (소속 유튜버/인플루언서 목록)
const Partners = () => {
  const { partners } = useContent('home');
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          split
          eyebrow={partners.eyebrow}
          headline={partners.headline}
          accent={partners.accent}
          subhead={partners.subhead}
          action={partners.morePath && <TextLink to={partners.morePath}>{partners.moreLabel}</TextLink>}
        />
        <CreatorGrid items={partners.items} />
      </div>
    </section>
  );
};

export default Partners;
