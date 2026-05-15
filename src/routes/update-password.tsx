import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/update-password")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Update Password" subtitle="Keep your account secure" />
      <Card className="max-w-xl"><CardContent className="p-6 space-y-4">
  <div className="space-y-1.5"><Label>Current password</Label><Input type="password" /></div>
  <div className="space-y-1.5"><Label>New password</Label><Input type="password" /></div>
  <div className="space-y-1.5"><Label>Confirm new password</Label><Input type="password" /></div>
  <Button>Update password</Button>
</CardContent></Card>
    </div>
  );
}
