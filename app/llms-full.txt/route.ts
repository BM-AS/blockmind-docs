import { getLLMText, source, blogSource } from '@/lib/source';
import type { InferPageType } from 'fumadocs-core/source';

export const revalidate = false;

async function getBlogLLMText(page: InferPageType<typeof blogSource>) {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title}\n\nDate: ${page.data.date}\nAuthor: ${page.data.author || 'BlockMind Team'}\n\n${processed}`;
}

export async function GET() {
  const docsScan = source.getPages().map(getLLMText);
  const blogScan = blogSource.getPages().map(getBlogLLMText);

  const docsContent = await Promise.all(docsScan);
  const blogContent = await Promise.all(blogScan);

  const sections = [
    '# BlockMind Documentation\n',
    '## Documentation Pages\n',
    docsContent.join('\n\n---\n\n'),
    '\n\n---\n\n## Blog Posts\n',
    blogContent.join('\n\n---\n\n'),
  ];

  return new Response(sections.join('\n'));
}
