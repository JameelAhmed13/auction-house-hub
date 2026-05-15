import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/payout-details")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Payout Details" subtitle="Where seller earnings are sent" />
      <Card className="max-w-xl"><CardContent className="p-6 space-y-4"><div className="space-y-1.5"><Label>Bank name</Label><Input defaultValue="Emirates NBD" /></div><div className="space-y-1.5"><Label>IBAN</Label><Input defaultValue="AE07 0331 2345 6789 0123 456" /></div><div className="space-y-1.5"><Label>Account holder</Label><Input defaultValue="Khalid Al Mansoori" /></div><Button>Save</Button></CardContent></Card>
    </div>
  );
}
