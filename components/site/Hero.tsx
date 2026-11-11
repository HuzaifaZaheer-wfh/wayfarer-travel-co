'use client';

import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchPanel } from '@/components/site/SearchPanel';
import { useHeroIntro } from '@/hooks/use-gsap';
import { heroImage } from '@/lib/data';

export function Hero() {
  const ref = useHeroIntro<HTMLElement>();

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt="Aerial view of a rugged coastline with a winding road and dramatic cliffs"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/40 to-forest/85" />
      </div>

      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl pt-12">
          <p className="eyebrow text-sand" data-hero>
            <Compass className="h-4 w-4" aria-hidden="true" />
            Curated journeys since 2011
          </p>
          <h1 className="heading-xl mt-5 text-ivory" data-hero>
            The world,{' '}
            <span className="italic text-sand">beautifully</span> within reach.
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-sand sm:text-xl"
            data-hero
          >
            WAYFARER Travel Co. is a boutique agency crafting seamless journeys —
            visas, flights, hotels, and car rentals, handled by people who know
            the way.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4" data-hero>
            <Button
              asChild
              className="rounded-full bg-terracotta px-7 py-3 text-base text-white hover:bg-terracotta-600"
            >
              <Link href="/destinations">
                Explore destinations
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-ivory/40 bg-transparent px-7 py-3 text-base text-ivory hover:bg-ivory hover:text-forest"
            >
              <Link href="/contact">Plan my trip</Link>
            </Button>
          </div>
        </div>

        {/* Floating search panel */}
        <div
          className="mt-12 w-full max-w-4xl pb-20 lg:mt-16 lg:pb-24"
          data-hero
          id="search"
        >
          <SearchPanel />
        </div>
      </div>

      {/* bottom fade into ivory */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ivory to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
