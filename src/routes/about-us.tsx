import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/about-us")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="About Us" subtitle="The team behind BK Cars Auctions" />
      <div className="prose prose-neutral dark:prose-invert max-w-none rounded-2xl border bg-card p-8 leading-relaxed text-card-foreground">
        <p>BK Cars Auctions is the Middle East's premium automotive auction marketplace, connecting verified buyers and sellers across the GCC.</p>
        <h3>Our mission</h3>
        <p>To make buying and selling vehicles transparent, fast, and trusted — whether you're a private collector or a high-volume dealer.</p>
        <h3>Why we built this</h3>
        <p>The traditional auction experience is opaque, slow, and built for insiders. We rebuilt it from the ground up — live lanes, real-time bidding, instant settlement.</p>
      </div>
    </div>
  );
}
