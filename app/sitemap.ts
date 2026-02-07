import type { MetadataRoute } from 'next';
import { source, faqSource } from '@/lib/source';

const baseUrl = 'https://docs.blockmind.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with their last modified dates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-02-06'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date('2026-02-06'),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ];

  // Get all docs pages
  const docsPages = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date('2026-02-06'), // Set to launch date
    changeFrequency: 'weekly' as const,
    priority: page.url === '/docs' ? 0.9 : 0.8,
  }));

  // Get all FAQ pages
  const faqPages = faqSource.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date('2026-02-06'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...docsPages, ...faqPages];
}
