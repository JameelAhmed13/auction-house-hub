import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/why-choose-us")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Why Choose Us" subtitle="What makes us different" />
      <div className="prose prose-neutral dark:prose-invert max-w-none rounded-2xl border bg-card p-8 leading-relaxed text-card-foreground">
        <ul>
          <li><strong>Verified inventory</strong> — every vehicle is inspected, scored, and disclosed.</li>
          <li><strong>Real-time bidding</strong> — multi-lane live auctions with sub-second updates.</li>
          <li><strong>Instant settlement</strong> — pay fast, pick up faster.</li>
          <li><strong>Trusted dealer network</strong> — curated sellers with verified reputations.</li>
          <li><strong>Transparent pricing</strong> — flat fees, no surprises.</li>
        </ul>
      </div>
    </div>
  );
}
