import React from 'react';
import { BaseSlideProps, BulletItem } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';

type SummaryProps = BaseSlideProps & {
  highlights?: BulletItem[];
};

export const Summary: React.FC<SummaryProps> = ({ title, subTitle, highlights, className }) => {
  return (
    <SlideContainer className={className}>
      <Heading title={title} subTitle={subTitle} align="center"/>
      {highlights && (
        <div className="mt-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((h,i)=>(
            <div key={i} className="rounded-2xl p-5 bg-white/5 border border-white/10">
              <div className="text-xl font-bold">{h.label}</div>
              {h.desc && <div className="mt-2 text-[color:var(--muted)]">{h.desc}</div>}
            </div>
          ))}
        </div>
      )}
    </SlideContainer>
  );
};

