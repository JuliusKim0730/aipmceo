import React from 'react';
import { BaseSlideProps, BulletItem } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';

type ChecklistProps = BaseSlideProps & {
  items: BulletItem[];
  numbered?: boolean;
};

export const Checklist: React.FC<ChecklistProps> = ({ title, subTitle, items, numbered=false, className }) => {
  return (
    <SlideContainer className={className}>
      <Heading title={title} subTitle={subTitle}/>
      <ol className={`mt-6 space-y-3 ${numbered ? 'list-decimal pl-6' : 'list-disc pl-6'}`}>
        {items.map((it, idx)=>(
          <li key={idx} className="text-lg">
            <span className="font-semibold">{it.label}</span>
            {it.desc && <span className="text-[color:var(--muted)]"> — {it.desc}</span>}
          </li>
        ))}
      </ol>
    </SlideContainer>
  );
};

