import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/profile")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="My Profile" subtitle="Manage your personal details" />
      <Card><CardContent className="p-6 grid gap-4 md:grid-cols-2">
  <div className="space-y-1.5"><Label>First name</Label><Input defaultValue="Khalid" /></div>
  <div className="space-y-1.5"><Label>Last name</Label><Input defaultValue="Al Mansoori" /></div>
  <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="khalid@bkcars.com" /></div>
  <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+971 50 123 4567" /></div>
  <div className="space-y-1.5"><Label>CNIC</Label><Input defaultValue="784-1990-1234567-1" /></div>
  <div className="space-y-1.5"><Label>Country</Label><Input defaultValue="UAE" /></div>
  <div className="md:col-span-2"><Button>Save changes</Button></div>
</CardContent></Card>
    </div>
  );
}
