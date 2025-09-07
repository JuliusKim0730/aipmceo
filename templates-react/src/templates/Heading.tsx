import React from 'react';
import clsx from 'clsx';

export const Heading: React.FC<{ title: string; subTitle?: string; align?: 'left'|'center'|'right' }> = ({ title, subTitle, align='left' }) => {
  return (
    <header className={clsx("mb-6", {
      "text-left": align==='left',
      "text-center": align==='center',
      "text-right": align==='right'
    })}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">{title}</h1>
      {subTitle && <p className="mt-3 text-lg md:text-xl text-[color:var(--muted)]">{subTitle}</p>}
    </header>
  );
};

