import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/new-deposit-plan")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="New Deposit Plan" subtitle="Subscribe to a deposit plan" />
      <Card><CardContent className="p-8 space-y-4 text-center">
  <p className="text-muted-foreground">Choose a plan from the deposit plans page to subscribe.</p>
  <Button>Continue</Button>
</CardContent></Card>
    </div>
  );
}
