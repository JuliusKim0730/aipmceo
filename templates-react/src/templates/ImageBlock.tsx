import React from 'react';
import { ImageContext } from './types';

export const ImageBlock: React.FC<{ ctx?: ImageContext; className?: string }> = ({ ctx, className }) => {
  if (!ctx || ctx.type === 'none') return null;
  if (ctx.type === 'url') {
    return (
      <div className={className}>
        <img
          src={ctx.src}
          alt={ctx.alt ?? ""}
          className={`w-full h-full object-${ctx.fit ?? 'cover'} rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)]`}
          loading="lazy"
        />
      </div>
    );
  }
  if (ctx.type === 'figure') {
    return (
      <figure className={className}>
        <img
          src={ctx.src}
          alt={ctx.alt ?? ""}
          className={`w-full h-full object-${ctx.fit ?? 'cover'} rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)]`}
          loading="lazy"
        />
        {ctx.caption && (
          <figcaption className="mt-3 text-sm text-[color:var(--muted)]">{ctx.caption}</figcaption>
        )}
      </figure>
    );
  }
  return <div className={className} aria-label={ctx.label ?? ctx.name} />;
};

