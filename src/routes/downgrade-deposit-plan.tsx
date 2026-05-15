import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/downgrade-deposit-plan")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Downgrade Plan" subtitle="Move to a lower tier" />
      <Card><CardContent className="p-8 space-y-4 text-center">
  <p className="text-muted-foreground">Preview your downgraded plan and confirm.</p>
  <Button>Continue</Button>
</CardContent></Card>
    </div>
  );
}
