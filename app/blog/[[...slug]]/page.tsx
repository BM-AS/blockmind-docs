import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import Link from 'next/link';

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
          Insights on crypto, DeFi, and portfolio management.
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.url} className="border-b pb-6">
              <Link href={post.url} className="group">
                <h2 className="text-xl font-semibold group-hover:text-fd-primary transition-colors">
                  {post.data.title}
                </h2>
                <p className="text-sm text-fd-muted-foreground mt-1">
                  {post.data.date} • {post.data.author || 'BlockMind Team'}
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

  return (
    <article>
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">{page.data.title}</h1>
        <p className="text-fd-muted-foreground">
          {page.data.date} • {page.data.author || 'BlockMind Team'}
        </p>
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDX components={getMDXComponents({})} />
      </div>
      <footer className="mt-12 pt-6 border-t">
        <Link href="/blog" className="text-fd-primary hover:underline">
          ← Back to Blog
        </Link>
      </footer>
    </article>
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
      title: 'Blog | BlockMind Documentation',
      description: 'Insights on crypto, DeFi, and portfolio management from BlockMind.',
    };
  }

  const page = blogSource.getPage(slug);
  if (!page) notFound();

  const canonicalUrl = `https://docs.blockmind.app${page.url}`;

  return {
    title: `${page.data.title} | BlockMind Blog`,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
