import React from 'react';
import clsx from 'clsx';

export const SlideContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
}> = ({ children, className, fullBleed }) => {
  return (
    <section
      className={clsx(
        "relative w-full h-[56.25vw] max-h-screen aspect-video overflow-hidden",
        "px-8 md:px-12 lg:px-16 py-8 md:py-10",
        fullBleed ? "slide-gradient" : "",
        className
      )}
      role="group"
      aria-roledescription="slide"
    >
      {children}
    </section>
  );
};

