import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import Script from 'next/script';

// HowTo schemas for step-by-step pages
const howToSchemas: Record<string, object> = {
  'getting-started/connect-wallet': {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Connect a Wallet to BlockMind',
    description: 'Connect your crypto wallet to BlockMind for automatic portfolio tracking.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Navigate to Import',
        text: 'Navigate to Portfolio → Import Wallet',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Click Connect',
        text: 'Click Connect Wallet',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Wallet',
        text: 'Select your wallet from the modal (MetaMask, Phantom, etc.)',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Approve Connection',
        text: 'Approve the connection in your wallet',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Import Holdings',
        text: 'BlockMind will scan and import your holdings',
      },
    ],
  },
  'getting-started/create-account': {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Create a BlockMind Account',
    description: 'Sign up for BlockMind and create your first portfolio.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Visit BlockMind',
        text: 'Go to blockmind.app',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Click Sign Up',
        text: 'Click Get Started or Sign Up',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Enter Email',
        text: 'Enter your email address',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Verify Email',
        text: 'Verify your email with the code we send you',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Create Portfolio',
        text: 'Create your first portfolio and start tracking',
      },
    ],
  },
};

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const gitConfig = {
    user: 'BM-AS',
    repo: 'blockmind-docs',
    branch: 'main',
  };

  // Check if this page has a HowTo schema
  const pagePath = params.slug?.join('/') || '';
  const howToSchema = howToSchemas[pagePath];

  return (
    <>
      {howToSchema && (
        <Script
          id={`howto-schema-${pagePath.replace(/\//g, '-')}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${pagePath || 'index'}.mdx`}
          />
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
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
      images: getPageImage(page).url,
    },
  };
}
