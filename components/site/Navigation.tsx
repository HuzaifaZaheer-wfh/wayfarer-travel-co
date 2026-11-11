'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/data';

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // The hero/subpage header is dark, so the top nav should be light-on-dark
  // until the user scrolls past it (then it becomes ivory). On the contact page
  // the top of the page is ivory, so we start solid.
  const isHome = pathname === '/';
  const solid = scrolled || !isHome;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'bg-ivory/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <nav
        className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between"
        aria-label="Primary"
      >
        <Link href="/" aria-label="WAYFARER Travel Co. — home">
          <Logo
            textClassName={cn(
              !solid && '[&_span:first-child]:text-ivory'
            )}
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'group relative text-sm font-medium transition-colors',
                    solid
                      ? active
                        ? 'text-forest'
                        : 'text-forest/70 hover:text-forest'
                      : active
                        ? 'text-ivory'
                        : 'text-ivory/80 hover:text-ivory'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-px bg-terracotta transition-all duration-300',
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-forest px-6 text-ivory hover:bg-forest-600"
          >
            <Link href="/contact">
              <Plane className="mr-2 h-4 w-4" aria-hidden="true" />
              Plan a Trip
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden',
            solid
              ? 'text-forest hover:bg-forest/5'
              : 'text-ivory hover:bg-ivory/10'
          )}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 top-20 z-40 bg-ivory transition-all duration-300 lg:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <div className="container-px flex h-full flex-col gap-2 pt-6 pb-24">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between border-b border-forest/10 py-4 font-serif text-2xl transition-colors',
                  active ? 'text-terracotta-600' : 'text-forest hover:text-terracotta-600'
                )}
              >
                {link.label}
                <span className="text-terracotta" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          })}
          <Button
            asChild
            className="mt-6 w-full rounded-full bg-forest py-4 text-base text-ivory hover:bg-forest-600"
          >
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Plane className="mr-2 h-4 w-4" aria-hidden="true" />
              Plan a Trip
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
