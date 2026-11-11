import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHeader } from '@/components/site/PageHeader';
import { Destinations } from '@/components/site/Destinations';
import { CtaBand } from '@/components/site/CtaBand';

export const metadata: Metadata = {
  title: 'Destinations | WAYFARER Travel Co.',
  description:
    'Explore WAYFARER’s curated destinations — Santorini, Bali, Kyoto, the Swiss Alps, and Dubai — each bookable as a tailor-made itinerary.',
};

const headerImage =
  'https://images.pexels.com/photos/13650583/pexels-photo-13650583.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000';

export default function DestinationsPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Popular destinations"
        title={
          <>
            Places worth crossing the{' '}
            <span className="italic text-sand">world</span> for.
          </>
        }
        subtitle="A shortlist of journeys our travellers return from raving about — each one bookable as a tailor-made itinerary."
        image={headerImage}
        alt="Sunset over Santorini's iconic architecture above the Aegean Sea"
      />
      <Destinations />
      <CtaBand />
    </SiteShell>
  );
}
