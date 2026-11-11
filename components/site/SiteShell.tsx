'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/site/Navigation';
import { Footer } from '@/components/site/Footer';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll to top on route change (SPA navigation keeps scroll position).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
