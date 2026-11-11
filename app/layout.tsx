import './globals.css';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wayfarertravel.co'),
  title: 'WAYFARER Travel Co. | Curated Journeys, Effortlessly Planned',
  description:
    'WAYFARER Travel Co. is a boutique travel agency crafting seamless journeys — visa assistance, flights, hotels, and car rentals for Santorini, Bali, Kyoto, the Swiss Alps, Dubai and beyond.',
  keywords: [
    'travel agency',
    'visa services',
    'flight booking',
    'hotel booking',
    'car rental',
    'luxury travel',
    'WAYFARER',
  ],
  authors: [{ name: 'WAYFARER Travel Co.' }],
  openGraph: {
    title: 'WAYFARER Travel Co. | Curated Journeys, Effortlessly Planned',
    description:
      'Boutique travel planning — visa assistance, flights, hotels, and car rentals for the world’s most beautiful destinations.',
    type: 'website',
    siteName: 'WAYFARER Travel Co.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAYFARER Travel Co. | Curated Journeys',
    description:
      'Boutique travel planning — visa assistance, flights, hotels, and car rentals.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ivory text-forest font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
