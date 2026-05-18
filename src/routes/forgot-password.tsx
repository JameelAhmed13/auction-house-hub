import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { CreditCard, ArrowLeft, KeyRound, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPasswordPage });

function ForgotPasswordPage() {
  const [cnic, setCnic] = useState("42301-1234567-1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("OTP sent to your registered phone number");
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-md">
            <KeyRound className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold">Reset Password</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Enter your registered CNIC to receive an OTP for password recovery
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="cnic" className="text-sm font-medium">
              CNIC Number
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="cnic"
                type="text"
                placeholder="12345-1234567-1"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Send OTP
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </form>

        {/* Back Link */}
        <Link
          to="/login"
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
