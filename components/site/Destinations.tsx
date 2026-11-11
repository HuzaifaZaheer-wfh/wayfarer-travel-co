
'use client';

import Link from 'next/link';
import { Star, ArrowUpRight } from 'lucide-react';

import { destinations } from '@/lib/data';
import { useScrollReveal } from '@/hooks/use-gsap';
import { cn } from '@/lib/utils';

export function Destinations() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section
      id="destinations"
      ref={ref}
      className="section-py bg-forest-50"
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>
              Popular destinations
            </p>

            <h2 className="heading-lg mt-4 text-forest" data-reveal>
              Places worth crossing the world for.
            </h2>
          </div>

          <p
            className="max-w-sm text-base leading-relaxed text-forest/70"
            data-reveal
          >
            A shortlist of journeys our travellers return from raving about —
            each one bookable as a tailor-made itinerary.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, index) => (
            <article
              key={dest.id}
              data-reveal
              data-gsap-hover=""
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-forest/10 bg-card shadow-soft transition-shadow duration-500 hover:shadow-card',
                index === 0 && 'md:col-span-2 lg:row-span-2'
              )}
            >
              <div
                className={cn(
                  'relative w-full overflow-hidden',
                  index === 0
                    ? 'aspect-[16/12] lg:aspect-[16/13]'
                    : 'aspect-[16/11]'
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dest.image}
                  alt={dest.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-1 rounded-full bg-ivory/90 px-3 py-1.5 text-xs font-medium text-forest backdrop-blur-sm">
                  <Star
                    className="h-3.5 w-3.5 fill-sand text-sand"
                    aria-hidden="true"
                  />
                  {dest.rating.toFixed(1)}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="text-xs uppercase tracking-[0.2em] text-sand">
                    {dest.country}
                  </p>

                  <h3
                    className={cn(
                      'mt-1 font-serif text-ivory',
                      index === 0 ? 'text-4xl' : 'text-2xl'
                    )}
                  >
                    {dest.name}
                  </h3>

                  <p className="mt-1 text-sm text-ivory/80">
                    {dest.tagline}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <p className="text-sm leading-relaxed text-forest/75">
                  {dest.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {dest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-forest/5 px-3 py-1 text-xs font-medium text-forest/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-1 flex items-center justify-between border-t border-forest/10 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-forest/50">
                      From
                    </p>

                    <p className="font-serif text-xl text-forest">
                      ${dest.priceFrom.toLocaleString('en-US')}

                      <span className="ml-1 text-xs font-sans text-forest/50">
                        / {dest.duration}
                      </span>
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    aria-label={`Plan a trip to ${dest.name}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest text-ivory transition-colors duration-300 hover:bg-terracotta"
                  >
                    <ArrowUpRight
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
