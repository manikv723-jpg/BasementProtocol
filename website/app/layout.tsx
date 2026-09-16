import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './enterprise.css';
import './smes.css';
import './landing.css';
import './fouruple.css';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';
const sans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});
const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Basement Protocol | AI Consulting and Custom AI Agents in India',
    template: '%s | Basement Protocol',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'AI consulting',
    'AI consulting company India',
    'AI consulting for SMEs',
    'AI agent development',
    'custom AI agents',
    'AI automation for small business',
    'AI lead generation',
    'enterprise AI solutions',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: 'Basement Protocol | AI consulting and custom AI agents',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basement Protocol | AI consulting and custom AI agents',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  category: 'technology',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="dark">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
