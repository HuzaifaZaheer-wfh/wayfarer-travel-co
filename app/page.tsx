import { SiteShell } from '@/components/site/SiteShell';
import { Hero } from '@/components/site/Hero';
import { Services } from '@/components/site/Services';
import { Destinations } from '@/components/site/Destinations';
import { WhyChooseUs } from '@/components/site/WhyChooseUs';
import { Testimonials } from '@/components/site/Testimonials';
import { Contact } from '@/components/site/Contact';

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Services />
      <Destinations />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </SiteShell>
  );
}
