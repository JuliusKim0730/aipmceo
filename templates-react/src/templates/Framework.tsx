import React from 'react';
import { BaseSlideProps, FrameworkStep } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';

type FrameworkProps = BaseSlideProps & {
  steps: FrameworkStep[];
  variant?: 'linear'|'funnel'|'cycle';
};

export const Framework: React.FC<FrameworkProps> = ({ title, subTitle, steps, variant='linear', className }) => {
  return (
    <SlideContainer className={className}>
      <Heading title={title} subTitle={subTitle}/>
      <div className="mt-6">
        {variant === 'linear' && (
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((s,i)=>(
              <li key={i} className="rounded-2xl p-5 bg-white/5 border border-white/10">
                <div className="text-sm text-[color:var(--muted)]">Step {i+1}</div>
                <div className="text-xl font-bold mt-1">{s.title}</div>
                {s.desc && <p className="mt-2 text-sm text-[color:var(--muted)]">{s.desc}</p>}
              </li>
            ))}
          </ol>
        )}
        {variant === 'funnel' && (
          <div className="space-y-3">
            {steps.map((s,i)=>(
              <div key={i} className="rounded-xl p-4 bg-white/5 border border-white/10"
                   style={{ width: `${100 - i*8}%`}}>
                <div className="text-md font-bold">{s.title}</div>
                {s.desc && <div className="text-sm text-[color:var(--muted)]">{s.desc}</div>}
              </div>
            ))}
          </div>
        )}
        {variant === 'cycle' && (
          <div className="grid place-items-center">
            <div className="relative w-[60vh] h-[60vh] max-w-full">
              {steps.map((s,i)=>(
                <div key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl px-4 py-2 bg-white/5 border border-white/10"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${(360/steps.length)*i}deg) translate(0, -24vh) rotate(-${(360/steps.length)*i}deg)`
                  }}>
                  <div className="text-sm text-[color:var(--muted)]">#{i+1}</div>
                  <div className="text-md font-bold">{s.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SlideContainer>
  );
};

