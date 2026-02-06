import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/logo.svg"
            alt="BlockMind"
            width={28}
            height={28}
            className="dark:invert"
          />
          <span className="font-semibold ml-2">BlockMind</span>
        </>
      ),
      url: '/',
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
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
