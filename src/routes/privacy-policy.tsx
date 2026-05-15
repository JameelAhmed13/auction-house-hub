import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/privacy-policy")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Privacy Policy" subtitle="How we handle your data" />
      <div className="prose prose-neutral dark:prose-invert max-w-none rounded-2xl border bg-card p-8 leading-relaxed text-card-foreground">
        <p>We respect your privacy and only collect data needed to provide the service.</p>
        <h3>Data we collect</h3><p>Account info, transaction data, device info for fraud prevention.</p>
        <h3>How we use it</h3><p>To facilitate auctions, payments, and improve the platform.</p>
        <h3>Your rights</h3><p>You can request export or deletion at any time.</p>
      </div>
    </div>
  );
}
