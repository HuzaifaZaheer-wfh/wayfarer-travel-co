'use client';

import { useScrollReveal } from '@/hooks/use-gsap';
import { Compass } from 'lucide-react';

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  alt: string;
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  alt,
}: PageHeaderProps) {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section
      ref={ref}
      className="relative flex min-h-[62vh] flex-col justify-end overflow-hidden pt-32"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/60 to-forest/40" />
      </div>

      <div className="container-px mx-auto max-w-7xl pb-16">
        <p className="eyebrow text-sand" data-reveal>
          <Compass className="h-4 w-4" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1
          className="heading-xl mt-5 max-w-3xl text-ivory"
          data-reveal
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-sand sm:text-xl"
            data-reveal
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ivory to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
