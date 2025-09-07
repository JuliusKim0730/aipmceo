import React from 'react';
import { BaseSlideProps, KPI } from './types';
import { SlideContainer } from './SlideContainer';
import { Heading } from './Heading';

type KPIBoardProps = BaseSlideProps & {
  kpis: KPI[];
};

export const KPIBoard: React.FC<KPIBoardProps> = ({ title, subTitle, kpis, className }) => {
  return (
    <SlideContainer className={className}>
      <Heading title={title} subTitle={subTitle}/>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {kpis.map((k, idx)=>(
          <div key={idx} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <div className="text-sm text-[color:var(--muted)]">{k.label}</div>
            <div className="mt-1 text-4xl font-extrabold">{k.value}</div>
            {(k.delta || k.hint) && (
              <div className="mt-2 text-sm">
                {k.delta && <span className="mr-2 text-[color:var(--accent)]">{k.delta}</span>}
                {k.hint && <span className="text-[color:var(--muted)]">{k.hint}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

