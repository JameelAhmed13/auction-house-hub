import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({ component: Page });
function Page() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">Forgot password?</h2>
      <p className="mt-1 text-sm text-muted-foreground">We'll send a 6-digit code to your email.</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("OTP sent"); navigate({ to: "/verify-otp" }); }}>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="khalid@bkcars.com" required /></div>
        <Button type="submit" className="w-full" size="lg">Send code</Button>
      </form>
      <p className="mt-6 text-center text-sm"><Link to="/login" className="text-primary hover:underline">Back to sign in</Link></p>
    </AuthLayout>
  );
}
