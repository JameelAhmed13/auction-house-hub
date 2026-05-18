import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import { toast } from "sonner";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

export const Route = createFileRoute("/vanity-corporate")({ component: CorporateVanityPage });

function CorporateVanityPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ntn: "3530189-2",
    companyName: "ABC Trading Company",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (!formData.ntn || !formData.companyName) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCreate = () => {
    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    toast.success("Corporate Vanity application created successfully");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Corporate Vanity"
        subtitle="Apply for corporate organization vanity plates"
      />

      {/* Step Progress */}
      <div className="flex gap-4 justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              s === step
                ? "bg-primary text-primary-foreground"
                : s < step
                ? "bg-green-500 text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s < step ? "✓" : s}
          </div>
        ))}
      </div>

      {step === 1 ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Corporate Details</CardTitle>
            <CardDescription>Enter your organization information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Disclaimer */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-semibold mb-1">⚠️ Disclaimer</p>
                <p>
                  Please make sure your NTN and Company Names are accurate before
                  proceeding.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ntn">NTN (National Tax Number)</Label>
                <Input
                  id="ntn"
                  name="ntn"
                  placeholder="e.g., 3530189-2"
                  value={formData.ntn}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="e.g., ABC Trading Company"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </CardContent>
        </Card>
      ) : step === 2 ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Select Vanity Number</CardTitle>
            <CardDescription>Choose your preferred registration plate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { number: "AB 0001/1", price: 500000 },
                { number: "AB 0100/2", price: 450000 },
                { number: "QT 0888/8", price: 400000 },
                { number: "AB 1111/1", price: 350000 },
              ].map((item) => (
                <Card
                  key={item.number}
                  className="border-2 border-border/60 cursor-pointer hover:border-primary transition-colors p-4"
                >
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <PlateDisplay plateNumber={item.number} size="sm" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      PKR {item.price.toLocaleString()}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Next</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Confirmation</CardTitle>
            <CardDescription>Review and submit your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">NTN:</span>
                <span className="font-semibold">{formData.ntn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company Name:</span>
                <span className="font-semibold">{formData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Application Type:</span>
                <span className="font-semibold">Corporate Vanity</span>
              </div>
            </div>

            {/* Terms */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I have read and agree to the terms and conditions of the E-Auction
                  portal
                </Label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleCreate} disabled={!formData.acceptTerms}>
                Create Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
