import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/select-seller-type")({ component: Page });
function Page() {
  const navigate = useNavigate();
  const [pick, setPick] = useState<"individual" | "organization">("individual");
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">Are you selling as...</h2>
      <div className="mt-6 grid gap-3">
        {[
          { id: "individual", icon: User, title: "Individual", desc: "Personal seller — quick onboarding." },
          { id: "organization", icon: Building2, title: "Organization", desc: "Dealership, fleet, or business entity." },
        ].map((o) => (
          <Card key={o.id} onClick={() => setPick(o.id as any)} className={cn("flex cursor-pointer items-start gap-4 p-4", pick === o.id && "border-primary ring-2 ring-primary/20")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary"><o.icon className="h-5 w-5" /></div>
            <div><div className="font-semibold">{o.title}</div><div className="text-xs text-muted-foreground">{o.desc}</div></div>
          </Card>
        ))}
      </div>
      <Button className="mt-6 w-full" size="lg" onClick={() => navigate({ to: pick === "organization" ? "/register-organization" : "/dashboard" })}>Continue</Button>
    </AuthLayout>
  );
}
