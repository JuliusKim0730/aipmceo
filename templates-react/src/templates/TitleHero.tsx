import React from 'react';
import { BaseSlideProps } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';
import { ImageBlock } from './ImageBlock';

export const TitleHero: React.FC<BaseSlideProps> = ({ title, subTitle, imageContext, className }) => {
  return (
    <SlideContainer fullBleed className={className}>
      <div className="absolute inset-0 -z-10 opacity-90">
        <ImageBlock ctx={imageContext} className="w-full h-full" />
      </div>
      <div className="relative max-w-5xl">
        <Heading title={title} subTitle={subTitle} />
      </div>
    </SlideContainer>
  );
};

