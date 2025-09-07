import React from 'react';
import { BaseSlideProps, BulletItem } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';
import { ImageBlock } from './ImageBlock';

type CaseStudyProps = BaseSlideProps & {
  points?: BulletItem[];
};

export const CaseStudy: React.FC<CaseStudyProps> = ({ title, subTitle, imageContext, points, className }) => {
  return (
    <SlideContainer className={className}>
      <div className="grid grid-cols-12 gap-8 h-full">
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
          <Heading title={title} subTitle={subTitle}/>
          {points && (
            <ul className="mt-4 space-y-2 list-disc pl-5">
              {points.map((p,i)=>(
                <li key={i}><span className="font-semibold">{p.label}</span>{p.desc? ` — ${p.desc}`:''}</li>
              ))}
            </ul>
          )}
        </div>
        <ImageBlock ctx={imageContext} className="col-span-12 md:col-span-6 h-64 md:h-[60vh]" />
      </div>
    </SlideContainer>
  );
};

