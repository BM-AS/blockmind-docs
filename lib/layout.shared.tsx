import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image
            src="/icon-192.png"
            alt="BlockMind"
            width={24}
            height={24}
            className="rounded"
          />
          <span className="font-semibold">BlockMind</span>
        </div>
      ),
      url: '/',
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Blog',
        url: '/blog',
        active: 'nested-url',
      },
      {
        text: 'FAQ',
        url: '/faq',
      },
      {
        text: 'App',
        url: 'https://blockmind.app',
        external: true,
      },
    ],
    githubUrl: 'https://github.com/BM-AS/blockmind-docs',
  };
}
