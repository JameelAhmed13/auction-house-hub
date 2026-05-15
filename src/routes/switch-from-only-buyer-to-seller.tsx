import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/switch-from-only-buyer-to-seller")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Become a Seller" subtitle="Start listing your inventory" />
      <Card><CardContent className="p-8 space-y-4 text-center">
  <p className="text-muted-foreground">Add the seller role to list and sell vehicles.</p>
  <Button>Continue</Button>
</CardContent></Card>
    </div>
  );
}
