import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {children}
      </div>
    </HomeLayout>
  );
}
