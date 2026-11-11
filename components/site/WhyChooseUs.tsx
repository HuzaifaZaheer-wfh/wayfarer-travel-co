'use client';

import { highlights, stats } from '@/lib/data';
import { useScrollReveal, useCountUp } from '@/hooks/use-gsap';

export function WhyChooseUs() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section id="why-choose-us" ref={ref} className="section-py bg-forest text-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy + highlights */}
          <div>
            <p className="eyebrow text-sand" data-reveal>
              Why choose us
            </p>
            <h2 className="heading-lg mt-4 text-ivory" data-reveal>
              Boutique by design, not by accident.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ivory/75" data-reveal>
              We’re small enough to know your trip by name and seasoned enough to
              move quietly when things change. That combination is rare — and
              it’s the reason travellers stay with us for decades.
            </p>

            <div className="mt-10 space-y-8">
              {highlights.map((h) => (
                <div
                  key={h.id}
                  data-reveal
                  className="flex gap-5"
                >
                  <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ivory/10 text-sand ring-1 ring-ivory/15">
                    <h.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ivory">{h.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ivory/70">
                      {h.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ivory/10 ring-1 ring-ivory/15" data-reveal>
            {stats.map((stat) => (
              <StatCell key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({
  stat,
}: {
  stat: { id: string; value: number; suffix: string; label: string; icon: React.ElementType };
}) {
  const countRef = useCountUp<HTMLSpanElement>(stat.value, stat.suffix);
  return (
    <div className="flex flex-col justify-between gap-6 bg-forest p-7 sm:p-9">
      <stat.icon className="h-7 w-7 text-sand" aria-hidden="true" />
      <div>
        <p className="font-serif text-4xl text-ivory sm:text-5xl">
          <span ref={countRef} aria-label={`${stat.value}${stat.suffix}`}>
            {stat.value.toLocaleString('en-US')}
            {stat.suffix}
          </span>
        </p>
        <p className="mt-2 text-sm uppercase tracking-wide text-ivory/60">
          {stat.label}
        </p>
      </div>
    </div>
  );
}
