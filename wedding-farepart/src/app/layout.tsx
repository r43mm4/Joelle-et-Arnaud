// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { coupleData } from '@/data/couple';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  display: 'swap',
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: coupleData.seo.title,
  description: coupleData.seo.description,
  keywords: [
    'mariage coutumier',
    'mariage bamiléké',
    'faire-part mariage',
    coupleData.partner1.firstName,
    coupleData.partner2.firstName,
    'Bandjoun',
    'Cameroun',
    '2026',
  ],
  openGraph: {
    title: `${coupleData.partner1.firstName} & ${coupleData.partner2.firstName} — Mariage Coutumier`,
    description: coupleData.seo.description,
    images: coupleData.ogImage
      ? [{ url: coupleData.ogImage, width: 1200, height: 630, alt: `Mariage de ${coupleData.partner1.firstName} et ${coupleData.partner2.firstName}` }]
      : [],
    locale: coupleData.seo.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${coupleData.partner1.firstName} & ${coupleData.partner2.firstName} 💍`,
    description: coupleData.seo.description,
  },
  robots: {
    index: false,   // Faire-part privé — ne pas indexer par défaut
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C9A96E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
