import type { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {children}
    </div>
  );
}
