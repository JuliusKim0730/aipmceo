import React from 'react';
import { BaseSlideProps } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';
import { ImageBlock } from './ImageBlock';

export const Question: React.FC<BaseSlideProps> = ({ title, subTitle, imageContext, className }) => {
  return (
    <SlideContainer className={className}>
      <div className="grid grid-cols-12 gap-8 h-full items-center">
        <div className="col-span-12 md:col-span-7">
          <Heading title={title} subTitle={subTitle} />
        </div>
        <ImageBlock ctx={imageContext} className="col-span-12 md:col-span-5 h-64 md:h-[60vh]" />
      </div>
    </SlideContainer>
  );
};

