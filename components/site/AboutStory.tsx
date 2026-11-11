'use client';

import { useScrollReveal } from '@/hooks/use-gsap';

export function AboutStory() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');

  return (
    <section ref={ref} className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative" data-reveal>
            <div className="overflow-hidden rounded-3xl shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/32191652/pexels-photo-32191652.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400"
                alt="Bali rice terraces bathed in golden sunrise light"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-forest px-7 py-5 text-ivory shadow-card sm:block">
              <p className="font-serif text-3xl text-sand">2011</p>
              <p className="text-xs uppercase tracking-wide text-ivory/70">
                Founded in SoHo
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="eyebrow" data-reveal>
              Our story
            </p>
            <h2 className="heading-lg mt-4 text-forest" data-reveal>
              Travel planned by people who love to travel.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-forest/75" data-reveal>
              <p>
                WAYFARER Travel Co. began in 2011 with a simple conviction: that
                the best journeys are crafted by people, not algorithms. What
                started as a two-desk studio in SoHo is now a small, devoted
                team of advisors with partners in 80+ countries.
              </p>
              <p>
                We’ve stayed deliberately boutique. Every trip is planned by a
                named advisor who knows your itinerary end to end — the visa
                officer’s quirks, the hotel manager’s name, the shortcut that
                saves an hour at customs.
              </p>
              <p>
                Fifteen years in, we’ve earned the trust of 48,000 travellers
                not by being the biggest, but by being present — quietly,
                reliably, at every hour of every leg.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
