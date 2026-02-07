import { docs, faq, blog } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const faqSource = loader({
  baseUrl: '/faq',
  source: faq.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

/**
 * Strip MDX components from text for LLM consumption
 * Converts <Cards>/<Card> to plain markdown links
 */
function stripMdxComponents(text: string): string {
  return text
    // Remove <Cards> wrapper tags
    .replace(/<Cards[^>]*>/gi, '')
    .replace(/<\/Cards>/gi, '')
    // Convert <Card title="X" href="Y" /> to markdown link
    .replace(/<Card\s+title="([^"]+)"\s+href="([^"]+)"\s*\/>/gi, '- [$1]($2)')
    .replace(/<Card\s+href="([^"]+)"\s+title="([^"]+)"\s*\/>/gi, '- [$2]($1)')
    // Remove any remaining self-closing Card tags
    .replace(/<Card[^>]*\/>/gi, '')
    // Remove any remaining Card open/close tags
    .replace(/<Card[^>]*>/gi, '')
    .replace(/<\/Card>/gi, '')
    // Clean up excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');
  const cleaned = stripMdxComponents(processed);

  return `# ${page.data.title}

${cleaned}`;
}
