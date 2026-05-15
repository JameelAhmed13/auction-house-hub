import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({ component: Page });
function Page() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">Set a new password</h2>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); navigate({ to: "/login" }); }}>
        <div className="space-y-1.5"><Label>New password</Label><Input type="password" required /></div>
        <div className="space-y-1.5"><Label>Confirm password</Label><Input type="password" required /></div>
        <Button type="submit" className="w-full" size="lg">Save</Button>
      </form>
    </AuthLayout>
  );
}
