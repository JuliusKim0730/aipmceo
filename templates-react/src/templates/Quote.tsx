import React from 'react';
import { BaseSlideProps } from './types';
import { SlideContainer } from './SlideContainer';

export const Quote: React.FC<BaseSlideProps> = ({ title, subTitle, className }) => {
  return (
    <SlideContainer className={className}>
      <blockquote className="max-w-5xl mx-auto text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">“{title}”</div>
        {subTitle && <div className="mt-4 text-xl text-[color:var(--muted)]">{subTitle}</div>}
      </blockquote>
    </SlideContainer>
  );
};

