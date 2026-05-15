import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/terms-and-conditions")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Terms & Conditions" subtitle="The fine print" />
      <div className="prose prose-neutral dark:prose-invert max-w-none rounded-2xl border bg-card p-8 leading-relaxed text-card-foreground">
        <h3>1. Acceptance</h3><p>By using BK Cars Auctions you agree to these terms.</p>
        <h3>2. Bidding</h3><p>All bids are binding. Winning bidders are obligated to complete the purchase.</p>
        <h3>3. Fees</h3><p>Buyer's premium, taxes, and clearance fees apply per the published schedule.</p>
        <h3>4. Disputes</h3><p>Disputes are governed by the laws of the United Arab Emirates.</p>
      </div>
    </div>
  );
}
