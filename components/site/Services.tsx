
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { services } from '@/lib/data';
import { useScrollReveal } from '@/hooks/use-gsap';

export function Services() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section
      id="services"
      ref={ref}
      className="section-py bg-ivory"
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            What we do
          </p>

          <h2 className="heading-lg mt-4 text-forest" data-reveal>
            Every leg of the journey, under one roof.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-forest/70" data-reveal>
            From the first visa stamp to the last-mile car rental, our advisors
            handle the logistics so you can be fully present for the trip.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              data-reveal
              data-gsap-hover=""
              className="group relative flex flex-col rounded-2xl border border-forest/10 bg-card p-6 shadow-soft transition-shadow duration-300 hover:border-terracotta/30 hover:shadow-card sm:p-7"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-forest text-sand transition-colors duration-300 group-hover:bg-terracotta group-hover:text-white">
                <service.icon className="h-7 w-7" aria-hidden="true" />
              </span>

              <h3 className="mt-6 font-serif text-2xl text-forest">
                {service.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/70">
                {service.description}
              </p>

              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-forest/80"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-terracotta"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={service.cta.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-terracotta-600 transition-colors hover:text-terracotta-700"
              >
                {service.cta.label}

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
