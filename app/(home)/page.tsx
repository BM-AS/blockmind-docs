import Link from 'next/link';
import Image from 'next/image';
import { blogSource } from '@/lib/source';

export default function HomePage() {
  const latestPosts = blogSource.getPages().sort((a, b) => {
    const dateA = new Date(a.data.date || '').getTime();
    const dateB = new Date(b.data.date || '').getTime();
    return dateB - dateA;
  }).slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
      {/* Hero */}
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/icon-192.png"
          alt="BlockMind logo"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <span className="text-2xl font-semibold tracking-tight">BlockMind</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
        Documentation
      </h1>
      
      <p className="text-lg text-muted-foreground text-center mb-8 max-w-xl leading-relaxed">
        Everything you need to track your crypto portfolio, analyze tokens, and understand market conditions.
      </p>
      
      <div className="flex gap-3 mb-16">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="https://blockmind.app"
          className="inline-flex items-center justify-center rounded-lg border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open BlockMind
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-4 md:grid-cols-3 max-w-4xl w-full">
        <Link href="/docs/portfolio/overview" className="group">
          <div className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors h-full">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              Portfolio Tracking
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect your wallets and monitor holdings across Ethereum, Base, Polygon, Arbitrum, Solana, and more.
            </p>
          </div>
        </Link>
        
        <Link href="/docs/deepdive/getting-started" className="group">
          <div className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors h-full">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              DeepDive Analysis
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Generate comprehensive reports with on-chain metrics, sentiment data, and risk assessment for any token.
            </p>
          </div>
        </Link>
        
        <Link href="/docs/market/overview" className="group">
          <div className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors h-full">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              Market Indicators
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Track Fear & Greed Index, Altcoin Season, BTC Dominance, and our proprietary Contrarian Index.
            </p>
          </div>
        </Link>
      </div>

      {/* Latest from Blog */}
      {latestPosts.length > 0 && (
        <div className="mt-16 max-w-4xl w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Latest from the Blog</h2>
            <Link href="/blog" className="text-sm text-primary hover:underline">
              View all posts →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.url} href={post.url} className="group">
                <div className="p-5 rounded-xl border bg-card hover:border-primary/50 transition-colors h-full flex flex-col">
                  <p className="text-xs text-muted-foreground mb-2">{post.data.date}</p>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors text-sm leading-snug">
                    {post.data.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                    {post.data.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">Resources</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/blog" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link 
            href="/docs/getting-started/troubleshooting" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Troubleshooting
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link 
            href="/faq" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link 
            href="/docs/market/how-indicators-work" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Methodology
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <a 
            href="mailto:support@blockmind.app" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
}
