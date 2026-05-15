import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Tag, Users } from "lucide-react";
import { login, setMode } from "@/lib/auth-store";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/select-role")({ component: Page });

function Page() {
  const navigate = useNavigate();
  const [pick, setPick] = useState<"buyer" | "seller" | "both">("buyer");
  const opts = [
    { id: "buyer", icon: ShoppingBag, title: "I'm a Buyer", desc: "Bid on premium vehicles across the GCC." },
    { id: "seller", icon: Tag, title: "I'm a Seller", desc: "List your inventory and reach thousands of buyers." },
    { id: "both", icon: Users, title: "Both", desc: "Buy and sell from a single account." },
  ] as const;
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl font-bold">How will you use BK Cars?</h2>
      <p className="mt-1 text-sm text-muted-foreground">You can change this later.</p>
      <div className="mt-6 space-y-3">
        {opts.map((o) => (
          <Card key={o.id} onClick={() => setPick(o.id)} className={cn("flex cursor-pointer items-start gap-4 p-4 transition-all hover:border-primary/50", pick === o.id && "border-primary ring-2 ring-primary/20")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary"><o.icon className="h-5 w-5" /></div>
            <div><div className="font-semibold">{o.title}</div><div className="text-xs text-muted-foreground">{o.desc}</div></div>
          </Card>
        ))}
      </div>
      <Button className="mt-6 w-full" size="lg" onClick={() => {
        login(); setMode(pick === "seller" ? "seller" : "buyer");
        if (pick === "buyer") navigate({ to: "/dashboard" });
        else navigate({ to: "/select-seller-type" });
      }}>Continue</Button>
    </AuthLayout>
  );
}
