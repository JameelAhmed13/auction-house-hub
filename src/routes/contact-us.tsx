import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/contact-us")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Contact Us" subtitle="Get in touch" />
      <div className="prose prose-neutral dark:prose-invert max-w-none rounded-2xl border bg-card p-8 leading-relaxed text-card-foreground">
        <p>We'd love to hear from you. Reach out for support, partnerships, or general questions.</p>
        <p><strong>Email:</strong> support@bkcars.com<br/><strong>Phone:</strong> +971 4 234 5678<br/><strong>Address:</strong> Dubai, UAE</p>
      </div>
    </div>
  );
}
