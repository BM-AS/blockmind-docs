import { source, blogSource } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const lines: string[] = [];

  lines.push('# BlockMind Documentation');
  lines.push('');
  lines.push('> BlockMind is an intelligent crypto portfolio tracking platform with AI-powered analysis, market indicators, and multi-chain wallet support.');
  lines.push('');

  lines.push('## Documentation');
  lines.push('');
  for (const page of source.getPages()) {
    lines.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
  }

  lines.push('');
  lines.push('## Blog');
  lines.push('');
  for (const page of blogSource.getPages()) {
    lines.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
  }

  return new Response(lines.join('\n'));
}
