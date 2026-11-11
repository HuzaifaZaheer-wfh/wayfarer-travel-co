'use client';

import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { useScrollReveal } from '@/hooks/use-gsap';

export function Testimonials() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section id="testimonials" ref={ref} className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            Traveller stories
          </p>
          <h2 className="heading-lg mt-4 text-forest" data-reveal>
            Trips worth writing home about.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-forest/70" data-reveal>
            The testimonials below are sample content created to illustrate the
            WAYFARER experience. They do not represent real clients.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              data-reveal
              className="relative flex flex-col rounded-2xl border border-forest/10 bg-card p-7 shadow-soft"
            >
              <Quote
                className="absolute right-6 top-6 h-9 w-9 text-sand/40"
                aria-hidden="true"
              />
              <div
                className="flex items-center gap-1"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-sand text-sand"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-forest/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-forest/10 pt-5">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest text-sm font-medium uppercase text-sand"
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-serif text-lg text-forest">{t.name}</p>
                  <p className="text-sm text-forest/60">
                    {t.role} · {t.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
