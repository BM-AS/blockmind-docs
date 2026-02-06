import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'BlockMind Docs',
      url: '/',
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'FAQ',
        url: '/faq',
      },
      {
        text: 'BlockMind',
        url: 'https://blockmind.app',
        external: true,
      },
    ],
    githubUrl: 'https://github.com/BM-AS/blockmind-docs',
  };
}
