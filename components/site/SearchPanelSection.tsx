'use client';

import { useScrollReveal } from '@/hooks/use-gsap';
import { SearchPanel } from '@/components/site/SearchPanel';

export function SearchPanelSection() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section id="search" ref={ref} className="section-py bg-forest-50">
      <div className="container-px mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center" data-reveal>
            Start planning
          </p>
          <h2 className="heading-lg mt-4 text-forest" data-reveal>
            Search visas, flights, hotels & cars.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-forest/70" data-reveal>
            Pick a service and tell us where you’re headed. This is a demo
            search — no booking or payment is processed.
          </p>
        </div>
        <div className="mt-12" data-reveal>
          <SearchPanel />
        </div>
      </div>
    </section>
  );
}
