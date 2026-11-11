
import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

import { Logo } from '@/components/Logo';
import { navLinks, services } from '@/lib/data';

const contact = [
  {
    icon: Mail,
    label: 'hello@wayfarertravel.co',
    href: 'mailto:hello@wayfarertravel.co',
  },
  {
    icon: Phone,
    label: '+1 (212) 555-0148',
    href: 'tel:+12125550148',
  },
  {
    icon: MapPin,
    label: '12 Mercer Street, New York',
    href: undefined,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-600 text-ivory/80">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Logo
              markClassName="bg-ivory text-forest"
              textClassName="[&_span:first-child]:text-ivory [&_span:last-child]:text-sand"
            />

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
              A boutique travel agency crafting seamless journeys — visas,
              flights, hotels, and car rentals, handled end to end.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terracotta-600"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Plan a trip
            </Link>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-serif text-lg text-ivory">
              Explore
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/65 transition-colors hover:text-sand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="font-serif text-lg text-ivory">
              Services
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href="/services"
                    className="text-ivory/65 transition-colors hover:text-sand"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-ivory">
              Get in touch
            </h3>

            <ul className="mt-4 space-y-4 text-sm">
              {contact.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3"
                >
                  <item.icon
                    className="h-4 w-4 shrink-0 text-sand"
                    aria-hidden="true"
                  />

                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-all text-ivory/65 transition-colors hover:text-sand"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-ivory/65">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row">
          <p>
            © {year} WAYFARER Travel Co. All rights reserved.
          </p>

          <p>
            Demo website · Bookings and enquiries are not transmitted.
          </p>
        </div>
      </div>
    </footer>
  );
}
