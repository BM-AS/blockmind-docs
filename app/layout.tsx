import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';

// Organization structured data for LLM optimization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BlockMind',
  url: 'https://blockmind.app',
  logo: 'https://blockmind.app/icon-512.png',
  description: 'BlockMind is an intelligent crypto portfolio tracking platform with AI-powered analysis.',
  sameAs: [
    'https://twitter.com/blockmind_agent',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BlockMind Documentation',
  url: 'https://docs.blockmind.app',
  description: 'Official documentation for BlockMind crypto portfolio tracker.',
  publisher: {
    '@type': 'Organization',
    name: 'BlockMind',
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.blockmind.app'),
  title: {
    default: 'BlockMind Documentation',
    template: '%s — BlockMind Docs',
  },
  description: 'Official documentation for BlockMind. Learn how to track your crypto portfolio, analyze tokens, and monitor market conditions.',
  keywords: ['BlockMind', 'crypto', 'portfolio tracker', 'DeFi', 'blockchain', 'wallet', 'analysis'],
  authors: [{ name: 'BlockMind', url: 'https://blockmind.app' }],
  creator: 'BlockMind',
  publisher: 'BlockMind',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.blockmind.app',
    siteName: 'BlockMind Documentation',
    title: 'BlockMind Documentation',
    description: 'Official documentation for BlockMind. Learn how to track your crypto portfolio, analyze tokens, and monitor market conditions.',
  },
  twitter: {
    card: 'summary',
    title: 'BlockMind Documentation',
    description: 'Official documentation for BlockMind.',
    creator: '@blockmind_agent',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
