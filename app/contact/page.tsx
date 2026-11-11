import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHeader } from '@/components/site/PageHeader';
import { Contact } from '@/components/site/Contact';

export const metadata: Metadata = {
  title: 'Contact | WAYFARER Travel Co.',
  description:
    'Get in touch with WAYFARER Travel Co. — tell us where you’d like to go and a dedicated advisor will reply within one business day.',
};

const headerImage =
  'https://images.pexels.com/photos/6555198/pexels-photo-6555198.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000';

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let’s plan your next{' '}
            <span className="italic text-sand">journey.</span>
          </>
        }
        subtitle="Tell us where you’d like to go and what you need — a dedicated advisor will reply within one business day."
        image={headerImage}
        alt="Sunset over iconic Santorini windmills and white architecture"
      />
      <Contact />
    </SiteShell>
  );
}
