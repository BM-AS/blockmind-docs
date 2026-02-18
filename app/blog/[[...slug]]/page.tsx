import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  // If no slug, show blog index
  if (!slug || slug.length === 0) {
    const posts = blogSource.getPages().sort((a, b) => {
      const dateA = new Date(a.data.date || '').getTime();
      const dateB = new Date(b.data.date || '').getTime();
      return dateB - dateA;
    });

    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-fd-muted-foreground mb-8">
          Insights on crypto investing, market analysis, and portfolio management from the BlockMind team.
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.url} className="border-b pb-6">
              <Link href={post.url} className="group">
                <h2 className="text-xl font-semibold group-hover:text-fd-primary transition-colors">
                  {post.data.title}
                </h2>
                <p className="text-sm text-fd-muted-foreground mt-1">
                  {post.data.date} · {post.data.author || 'BlockMind Team'}
                </p>
                <p className="mt-2 text-fd-foreground/80">
                  {post.data.description}
                </p>
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-fd-muted-foreground">No posts yet. Check back soon!</p>
          )}
        </div>
      </div>
    );
  }

  // Show individual post
  const page = blogSource.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const canonicalUrl = `https://docs.blockmind.app${page.url}`;

  // JSON-LD Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.data.title,
    description: page.data.description,
    datePublished: page.data.date,
    dateModified: page.data.date,
    author: {
      '@type': 'Organization',
      name: page.data.author || 'BlockMind Team',
      url: 'https://blockmind.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BlockMind',
      url: 'https://blockmind.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://docs.blockmind.app/icon-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    image: `https://docs.blockmind.app/og/blog/${slug.join('/')}/image.png`,
  };

  // Get other posts for related reading
  const allPosts = blogSource.getPages();
  const relatedPosts = allPosts.filter((p) => p.url !== page.url);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article>
        <header className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold mb-2">{page.data.title}</h1>
          <p className="text-fd-muted-foreground">
            {page.data.date} · {page.data.author || 'BlockMind Team'}
          </p>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDX components={getMDXComponents({})} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <aside className="mt-12 pt-6 border-t">
            <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
            <div className="space-y-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.url}
                  href={post.url}
                  className="block p-3 rounded-lg border hover:border-fd-primary/50 transition-colors"
                >
                  <p className="font-medium text-sm">{post.data.title}</p>
                  <p className="text-xs text-fd-muted-foreground mt-1">{post.data.description}</p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <footer className="mt-8 pt-6 border-t flex items-center justify-between">
          <Link href="/blog" className="text-fd-primary hover:underline">
            ← Back to Blog
          </Link>
          <Link
            href="https://blockmind.app"
            className="inline-flex items-center justify-center rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try BlockMind Free →
          </Link>
        </footer>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const pages = blogSource.getPages();
  return [
    { slug: [] }, // Index page
    ...pages.map((page) => ({ slug: page.slugs })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  if (!slug || slug.length === 0) {
    return {
      title: 'Blog — BlockMind',
      description: 'Insights on crypto investing, market analysis, and portfolio management from the BlockMind team.',
      alternates: {
        canonical: 'https://docs.blockmind.app/blog',
      },
      openGraph: {
        type: 'website',
        url: 'https://docs.blockmind.app/blog',
        title: 'Blog — BlockMind',
        description: 'Insights on crypto investing, market analysis, and portfolio management from the BlockMind team.',
        siteName: 'BlockMind Documentation',
      },
      twitter: {
        card: 'summary',
        title: 'Blog — BlockMind',
        description: 'Insights on crypto investing, market analysis, and portfolio management.',
        creator: '@blockmind_agent',
      },
    };
  }

  const page = blogSource.getPage(slug);
  if (!page) notFound();

  const canonicalUrl = `https://docs.blockmind.app${page.url}`;
  const ogImage = `/og/blog/${slug.join('/')}/image.png`;

  return {
    title: `${page.data.title} — BlockMind Blog`,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: page.data.title,
      description: page.data.description,
      siteName: 'BlockMind Documentation',
      publishedTime: page.data.date,
      modifiedTime: page.data.date,
      authors: [page.data.author || 'BlockMind Team'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      creator: '@blockmind_agent',
      images: [ogImage],
    },
  };
}
