import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHeader } from '@/components/site/PageHeader';
import { WhyChooseUs } from '@/components/site/WhyChooseUs';
import { Testimonials } from '@/components/site/Testimonials';
import { CtaBand } from '@/components/site/CtaBand';
import { AboutStory } from '@/components/site/AboutStory';

export const metadata: Metadata = {
  title: 'About | WAYFARER Travel Co.',
  description:
    'WAYFARER Travel Co. is a boutique agency founded in 2011 — small enough to know your trip by name, seasoned enough to move quietly when plans change.',
};

const headerImage =
  'https://images.pexels.com/photos/10012179/pexels-photo-10012179.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000';

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            Boutique by design,{' '}
            <span className="italic text-sand">not by accident.</span>
          </>
        }
        subtitle="Small enough to know your trip by name, seasoned enough to move quietly when things change."
        image={headerImage}
        alt="Aerial view of a rugged coastline and azure sea"
      />
      <AboutStory />
      <WhyChooseUs />
      <Testimonials />
      <CtaBand />
    </SiteShell>
  );
}
