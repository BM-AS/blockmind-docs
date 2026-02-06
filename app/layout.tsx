import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.blockmind.app'),
  title: {
    default: 'BlockMind Documentation',
    template: '%s | BlockMind Docs',
  },
  description: 'Learn how to track your crypto portfolio, get AI-powered insights, and make smarter investment decisions with BlockMind.',
  keywords: ['crypto', 'portfolio', 'tracker', 'DeFi', 'blockchain', 'wallet', 'analysis', 'documentation'],
  authors: [{ name: 'BlockMind' }],
  creator: 'BlockMind',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.blockmind.app',
    siteName: 'BlockMind Documentation',
    title: 'BlockMind Documentation',
    description: 'Learn how to track your crypto portfolio, get AI-powered insights, and make smarter investment decisions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlockMind Documentation',
    description: 'Learn how to track your crypto portfolio, get AI-powered insights, and make smarter investment decisions.',
    creator: '@blockmind_agent',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
