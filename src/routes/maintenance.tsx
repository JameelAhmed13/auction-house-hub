import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/maintenance")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Maintenance" subtitle="We'll be right back" />
      <div className="prose prose-neutral dark:prose-invert max-w-none rounded-2xl border bg-card p-8 leading-relaxed text-card-foreground">
        <p>We're performing scheduled maintenance and will be back shortly. Thank you for your patience.</p>
      </div>
    </div>
  );
}
