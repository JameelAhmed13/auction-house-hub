import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-to-auction")({ component: HowToAuctionPage });

const steps = [
  {
    number: 1,
    title: "Register",
    description: "Register via app/portal. Enter CNIC, Email, Phone. OTP sent for verification.",
    color: "bg-orange-100 text-orange-700",
    borderColor: "border-orange-200",
  },
  {
    number: 2,
    title: "Login",
    description: "Login with credentials to access E-Auction system.",
    color: "bg-green-100 text-green-700",
    borderColor: "border-green-200",
  },
  {
    number: 3,
    title: "Select Number",
    description: "Select desired number, enter chassis number, submit. Review in My Applications.",
    color: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    number: 4,
    title: "Payment",
    description: "Receive PSID, pay Rs. 100 via mobile banking/ATM. Application authorized. Bidding enabled.",
    color: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200",
  },
];

function HowToAuctionPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="How to E-Auction"
        subtitle="Step-by-step guide to participate in vehicle registration auctions"
      />

      {/* Steps */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 flex-wrap justify-between">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center gap-4 flex-1 min-w-fit">
              <div className={`flex-shrink-0 rounded-full p-4 ${step.color} font-bold w-16 h-16 flex items-center justify-center`}>
                STEP {step.number}
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.number} className={`border-2 border-dashed ${step.borderColor}`}>
              <CardContent className="p-6 space-y-3">
                <div className={`text-xs font-bold uppercase tracking-widest ${step.color.split(" ")[0]} rounded px-2 py-1 w-fit`}>
                  Step {step.number}
                </div>
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div>
        <h3 className="mb-6 text-lg font-bold">E-Auction Video Tutorial</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden bg-muted">
            <CardContent className="p-0 aspect-video flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="mb-2 text-lg font-semibold">Step-by-Step User Guide</div>
                <p className="text-sm">[Video Placeholder]</p>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-muted">
            <CardContent className="p-0 aspect-video flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="mb-2 text-lg font-semibold">Tips & Best Practices</div>
                <p className="text-sm">[Video Placeholder]</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
