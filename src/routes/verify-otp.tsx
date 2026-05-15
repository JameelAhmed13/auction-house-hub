import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/verify-otp")({ component: Page });
function Page() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">Verify it's you</h2>
      <p className="mt-1 text-sm text-muted-foreground">Enter the 6-digit code we sent to your email.</p>
      <form className="mt-6 space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Verified"); navigate({ to: "/reset-password" }); }}>
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={otp.length < 6}>Verify</Button>
        <button type="button" className="block w-full text-center text-sm text-primary hover:underline">Resend code</button>
      </form>
    </AuthLayout>
  );
}
