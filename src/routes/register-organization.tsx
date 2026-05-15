import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { login, setMode } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/register-organization")({ component: Page });
function Page() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">Organization details</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tell us about your business.</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); login(); setMode("seller"); toast.success("Organization registered"); navigate({ to: "/dashboard" }); }}>
        <div className="space-y-1.5"><Label>Company name</Label><Input defaultValue="Premium Motors LLC" required /></div>
        <div className="space-y-1.5"><Label>Trade license #</Label><Input defaultValue="TL-2024-44210" required /></div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5"><Label>City</Label><Input defaultValue="Dubai" required /></div>
          <div className="space-y-1.5"><Label>Country</Label><Input defaultValue="UAE" required /></div>
        </div>
        <div className="space-y-1.5"><Label>Address</Label><Textarea defaultValue="Plot 412, Industrial Area 7, Dubai" rows={2} required /></div>
        <Button type="submit" className="w-full" size="lg">Finish</Button>
      </form>
    </AuthLayout>
  );
}
