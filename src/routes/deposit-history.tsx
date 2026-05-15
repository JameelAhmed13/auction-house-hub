import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/deposit-history")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Deposit History" subtitle="All deposit activity" />
      <Card><CardContent className="p-6 text-sm text-muted-foreground">No deposit history to display yet.</CardContent></Card>
    </div>
  );
}
