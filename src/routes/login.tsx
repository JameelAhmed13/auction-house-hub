import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, User, Shield, RotateCcw, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/lib/auth-store";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [cnic, setCnic] = useState("42301-1234567-1");
  const [password, setPassword] = useState("••••••••");
  const [captcha, setCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState("9X4M2K");

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let newCode = "";
    for (let i = 0; i < 6; i++) {
      newCode += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(newCode);
    setCaptcha("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ cnic });
    toast.success("Welcome back! Signed in successfully");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-2xl shadow-lg">
            ب
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your E-Auction account
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* CNIC Field */}
          <div className="space-y-2">
            <Label htmlFor="cnic" className="text-sm font-medium">
              CNIC Number
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="cnic"
                type="text"
                placeholder="12345-1234567-1"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="pl-10 h-11 transition-all focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11 transition-all focus:ring-2 focus:ring-primary/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* CAPTCHA Field */}
          <div className="space-y-2">
            <Label htmlFor="captcha" className="text-sm font-medium">
              Security Verification
            </Label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-muted to-secondary/50 border-2 border-dashed border-border rounded-lg px-4 h-11 font-mono font-bold text-lg tracking-widest select-none text-foreground italic">
                {captchaCode}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 shrink-0"
                onClick={refreshCaptcha}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="captcha"
                type="text"
                placeholder="Enter the captcha code"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="pl-10 h-11 transition-all focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <Checkbox id="remember" defaultChecked />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              Keep me signed in
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Sign In
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </form>

        {/* Register Link */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          New to E-Auction?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Create an account
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="rounded-lg bg-muted/50 p-3 space-y-2 border border-border/40">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            🎯 Demo Access
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => { setCnic("42301-1234567-1"); }}
              className="text-left px-2 py-1.5 rounded bg-background border hover:border-primary/40 transition-colors"
            >
              <div className="font-semibold">User</div>
              <div className="text-muted-foreground font-mono">42301-1234567-1</div>
            </button>
            <button
              type="button"
              onClick={() => { setCnic("11111-1111111-1"); }}
              className="text-left px-2 py-1.5 rounded bg-red-50 border border-red-200 hover:border-red-400 transition-colors"
            >
              <div className="font-semibold text-red-700">Admin</div>
              <div className="text-red-600 font-mono">11111-1111111-1</div>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Panel - Hero with green gradient */}
      <div className="relative hidden bg-hero-green text-white lg:flex lg:flex-col overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />

        <div className="relative flex h-full flex-col justify-between p-12">
          {/* Top: Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-primary font-bold text-xl shadow-lg">
              E
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">E-AUCTION</span>
              <span className="text-xs text-white/70">Balochistan</span>
            </div>
          </Link>

          {/* Middle: Hero Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-300 border border-yellow-400/30">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 animate-pulse" />
                Live Auctions Available
              </div>
              <h1 className="font-display text-5xl font-bold leading-tight">
                Unlock <span className="text-yellow-300">Prestige</span><br />
                with E-Auction
              </h1>
              <p className="text-base text-white/80 max-w-md leading-relaxed">
                Join Balochistan's exclusive online auction for unique automobile registration numbers. Bid securely, drive confidently.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-yellow-300">10K+</div>
                <div className="text-xs text-white/60">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">500+</div>
                <div className="text-xs text-white/60">Auctions Daily</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">100%</div>
                <div className="text-xs text-white/60">Secure</div>
              </div>
            </div>
          </div>

          {/* Bottom: Footer */}
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} Balochistan Excise, Taxation & Narcotics Control Department
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
