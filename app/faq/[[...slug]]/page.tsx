import { faqSource } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import Script from 'next/script';

// FAQ structured data for LLM optimization
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is BlockMind?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BlockMind is an intelligent crypto portfolio tracking platform. It helps you track your holdings across wallets and exchanges, get AI-powered analysis on any token, and monitor market conditions and trends.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is BlockMind free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, BlockMind is currently free to use with unlimited portfolio tracking, unlimited DeepDive analyses, and full access to market data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data safe with BlockMind?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All connections are encrypted (HTTPS), we never store your private keys, wallet connections are read-only, and your portfolios are private by default.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can BlockMind access my funds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. BlockMind only has read-only access to your public wallet addresses. We cannot move your funds, approve transactions, or access your private keys.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which blockchains does BlockMind support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BlockMind supports EVM chains (Ethereum, Base, Polygon, Arbitrum, Optimism, BSC, Avalanche) and Solana.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is DeepDive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DeepDive is BlockMind\'s AI-powered token analysis tool. It generates comprehensive reports covering project fundamentals, market data and trends, on-chain metrics, technical analysis, sentiment analysis, and risk assessment.',
      },
    },
  ],
};

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = faqSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(faqSource, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return faqSource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const page = faqSource.getPage(params.slug);
  if (!page) notFound();

  const canonicalUrl = `https://docs.blockmind.app${page.url}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}
