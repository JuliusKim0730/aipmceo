import React from 'react';
import { BaseSlideProps, BulletItem } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';
import clsx from 'clsx';

type ThreeCardProps = BaseSlideProps & {
  items: BulletItem[];
};

export const ThreeCard: React.FC<ThreeCardProps> = ({ title, subTitle, items, className }) => {
  return (
    <SlideContainer className={className}>
      <Heading title={title} subTitle={subTitle}/>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.slice(0,3).map((it, idx) => (
          <div key={idx} className={clsx(
            "rounded-2xl p-6 bg-white/5 backdrop-blur border border-white/10",
            "shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          )}>
            <h3 className="text-2xl font-bold">{it.label}</h3>
            {it.desc && <p className="mt-3 text-[color:var(--muted)]">{it.desc}</p>}
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

