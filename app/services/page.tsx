import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHeader } from '@/components/site/PageHeader';
import { Services } from '@/components/site/Services';
import { SearchPanelSection } from '@/components/site/SearchPanelSection';
import { CtaBand } from '@/components/site/CtaBand';

export const metadata: Metadata = {
  title: 'Services | WAYFARER Travel Co.',
  description:
    'Visa assistance, flight reservations, hotel booking, and car rental — every leg of the journey handled by WAYFARER’s advisors.',
};

const headerImage =
  'https://images.pexels.com/photos/8147170/pexels-photo-8147170.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000';

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="What we do"
        title={
          <>
            Every leg of the journey,{' '}
            <span className="italic text-sand">under one roof.</span>
          </>
        }
        subtitle="From the first visa stamp to the last-mile car rental, our advisors handle the logistics so you can be fully present for the trip."
        image={headerImage}
        alt="Aerial view of a scenic coastline at sunset with ocean and rugged cliffs"
      />
      <Services />
      <SearchPanelSection />
      <CtaBand />
    </SiteShell>
  );
}
