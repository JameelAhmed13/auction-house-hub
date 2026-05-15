import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/add-card-details")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Add Card" subtitle="Securely save a new payment method" />
      <Card className="max-w-xl"><CardContent className="p-6 space-y-4"><div className="space-y-1.5"><Label>Cardholder name</Label><Input defaultValue="Khalid Al Mansoori" /></div><div className="space-y-1.5"><Label>Card number</Label><Input defaultValue="4242 4242 4242 4242" /></div><div className="grid gap-3 grid-cols-2"><div className="space-y-1.5"><Label>Expiry</Label><Input defaultValue="08/27" /></div><div className="space-y-1.5"><Label>CVC</Label><Input defaultValue="123" /></div></div><Button>Save card</Button></CardContent></Card>
    </div>
  );
}
