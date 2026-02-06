import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
      {/* Hero */}
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/logo.svg"
          alt="BlockMind"
          width={48}
          height={48}
          className="dark:invert"
        />
        <span className="text-3xl font-bold tracking-tight">BlockMind</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
        Documentation
      </h1>
      
      <p className="text-lg text-muted-foreground text-center mb-8 max-w-xl">
        Learn how to track your crypto portfolio, get AI-powered insights, and make smarter investment decisions.
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
          Open App →
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-4 md:grid-cols-3 max-w-4xl w-full">
        <Link href="/docs/portfolio/overview" className="group">
          <div className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors h-full">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              Portfolio Tracking
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect wallets, track holdings across chains, and monitor your entire portfolio in one place.
            </p>
          </div>
        </Link>
        
        <Link href="/docs/deepdive/getting-started" className="group">
          <div className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors h-full">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              AI Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Get comprehensive DeepDive reports with on-chain data, sentiment analysis, and risk assessment.
            </p>
          </div>
        </Link>
        
        <Link href="/docs/market/overview" className="group">
          <div className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors h-full">
            <div className="text-2xl mb-3">📈</div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              Market Insights
            </h3>
            <p className="text-sm text-muted-foreground">
              Track Fear & Greed, Altcoin Season, BTC Dominance, and our proprietary Contrarian Index.
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">Quick links</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/docs/getting-started/troubleshooting" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Troubleshooting
          </Link>
          <span className="text-muted-foreground/50">·</span>
          <Link 
            href="/faq" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
          <span className="text-muted-foreground/50">·</span>
          <Link 
            href="/docs/market/how-indicators-work" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How Indicators Work
          </Link>
          <span className="text-muted-foreground/50">·</span>
          <a 
            href="mailto:support@blockmind.app" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
