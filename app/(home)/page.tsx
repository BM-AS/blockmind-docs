import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 px-4">
      <h1 className="text-4xl font-bold mb-4">BlockMind Documentation</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
        Learn how to track your crypto portfolio, get AI-powered insights, and make smarter investment decisions.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/faq"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          View FAQ
        </Link>
        <Link
          href="https://blockmind.app"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open BlockMind →
        </Link>
      </div>
      
      <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto text-left">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">📊 Portfolio Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Connect your wallets and track all your crypto holdings in one place.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">🤖 AI Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Get DeepDive reports with AI-powered insights on any token.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">📈 Market Data</h3>
          <p className="text-sm text-muted-foreground">
            Track market sentiment with Fear & Greed, Altcoin Season, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
