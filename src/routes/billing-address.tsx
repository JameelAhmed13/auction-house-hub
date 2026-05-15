import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/billing-address")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Billing Address" subtitle="Where invoices are sent" />
      <Card><CardContent className="p-6 space-y-4">
  <div className="grid gap-4 md:grid-cols-2">
    <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Khalid Al Mansoori" /></div>
    <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+971 50 123 4567" /></div>
    <div className="space-y-1.5 md:col-span-2"><Label>Address line</Label><Input defaultValue="Plot 412, Industrial Area 7" /></div>
    <div className="space-y-1.5"><Label>City</Label><Input defaultValue="Dubai" /></div>
    <div className="space-y-1.5"><Label>Country</Label><Input defaultValue="UAE" /></div>
  </div>
  <Button>Save address</Button>
</CardContent></Card>
    </div>
  );
}
