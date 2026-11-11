'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/use-gsap';

export function CtaBand() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section ref={ref} className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-forest px-8 py-16 text-center shadow-card sm:px-16 sm:py-20"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-terracotta/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-sand/15 blur-3xl"
            aria-hidden="true"
          />
          <p className="eyebrow justify-center text-sand">Ready when you are</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight text-ivory sm:text-4xl md:text-5xl">
            Let’s plan your next journey together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivory/75">
            Tell us where you’d like to go and a dedicated advisor will reply
            within one business day.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              className="rounded-full bg-terracotta px-8 py-3.5 text-base text-white hover:bg-terracotta-600"
            >
              <Link href="/contact">
                Plan a trip
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
