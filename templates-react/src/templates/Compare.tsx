import React from 'react';
import { BaseSlideProps, ComparePoint } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';

type CompareProps = BaseSlideProps & {
  left: ComparePoint;
  right: ComparePoint;
};

export const Compare: React.FC<CompareProps> = ({ title, subTitle, left, right, className }) => {
  return (
    <SlideContainer className={className}>
      <Heading title={title} subTitle={subTitle}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[left, right].map((col, i) => (
          <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-3">{col.title}</h3>
            <ul className="space-y-2 list-disc pl-5">
              {col.bullets.map((b, idx) => (<li key={idx}>{b}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

