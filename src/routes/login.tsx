import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Gavel, Mail, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">Welcome back</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to continue bidding.</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => { e.preventDefault(); login(); toast.success("Signed in"); navigate({ to: "/dashboard" }); }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" defaultValue="khalid@bkcars.com" className="pl-9" required />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type="password" defaultValue="••••••••" className="pl-9" required />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-sm font-normal">Keep me signed in</Label>
        </div>
        <Button type="submit" className="w-full" size="lg">Sign in</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden gradient-night text-sidebar-foreground lg:block">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, oklch(0.82 0.18 80 / 0.4), transparent 50%)" }} />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-gold"><Gavel className="h-5 w-5 text-primary-foreground" /></div>
            <span className="font-display text-xl font-bold">BK Cars Auctions</span>
          </Link>
          <div>
            <h1 className="font-display text-5xl font-bold leading-tight">Bid bold.<br />Drive premium.</h1>
            <p className="mt-4 max-w-md text-sidebar-foreground/70">Join thousands of buyers and sellers transacting with confidence on the Middle East's premier auction platform.</p>
          </div>
          <div className="text-xs text-sidebar-foreground/50">© {new Date().getFullYear()} BK Cars Auctions</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md border-border/60 shadow-xl">
          <CardContent className="p-8">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
