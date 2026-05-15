import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: Page });

function Page() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">Create your account</h2>
      <p className="mt-1 text-sm text-muted-foreground">Start bidding in under 2 minutes.</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Account created"); navigate({ to: "/select-role" }); }}>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5"><Label>First name</Label><Input defaultValue="Khalid" required /></div>
          <div className="space-y-1.5"><Label>Last name</Label><Input defaultValue="Al Mansoori" required /></div>
        </div>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="khalid@bkcars.com" required /></div>
        <div className="space-y-1.5"><Label>Phone</Label><Input type="tel" defaultValue="+971 50 123 4567" required /></div>
        <div className="space-y-1.5"><Label>Password</Label><Input type="password" defaultValue="••••••••" required /></div>
        <Button type="submit" className="w-full" size="lg">Continue</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
    </AuthLayout>
  );
}
