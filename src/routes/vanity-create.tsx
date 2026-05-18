import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/page-header";
import { PlateDisplay } from "@/components/plate-display";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/vanity-create")({ component: CreateVanityPage });

function CreateVanityPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "Gold",
    registrationNumber: "ABC 123",
    registrationDate: "2026-05-15",
    plateNumber: "AB 0123/1",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, checked, value } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.category || !formData.registrationNumber || !formData.registrationDate) {
        toast.error("Please fill in all fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.plateNumber) {
        toast.error("Please select a plate number");
        return;
      }
      setStep(3);
    }
  };

  const handleCreate = () => {
    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    toast.success("Vanity application submitted successfully");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Vanity"
        subtitle="Apply for a customized vehicle registration number"
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

      {/* Step 1: Vehicle Verification */}
      {step === 1 && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Enter your vehicle details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(v) => handleSelectChange("category", v)}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <Input
                  id="regNo"
                  name="registrationNumber"
                  placeholder="e.g., ABC 123"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Registration Date</Label>
                <Input
                  id="date"
                  name="registrationDate"
                  type="date"
                  value={formData.registrationDate}
                  onChange={handleChange}
                />
              </div>
              <Button className="w-full">Search Vehicle</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plate Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-12">
              <PlateDisplay plateNumber={formData.registrationNumber} size="lg" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Number Selection */}
      {step === 2 && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Plate Number</CardTitle>
              <CardDescription>Choose your preferred vanity number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {[
                  "AB 0001/1",
                  "AB 0007/7",
                  "AB 0123/4",
                  "QT 9999/9",
                  "AB 5555/5",
                  "AB 0888/8",
                ].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleSelectChange("plateNumber", num)}
                    className={`w-full p-3 rounded border-2 text-center font-mono font-bold transition-all ${
                      formData.plateNumber === num
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Plate</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-12">
              <PlateDisplay plateNumber={formData.plateNumber} size="lg" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Confirm Application</CardTitle>
            <CardDescription>Review and submit your vanity application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div className="bg-muted p-4 rounded space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-semibold">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle Reg No:</span>
                <span className="font-semibold">{formData.registrationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vanity Plate:</span>
                <span className="font-semibold">{formData.plateNumber}</span>
              </div>
            </div>

            {/* Plate Preview */}
            <div className="flex justify-center">
              <PlateDisplay plateNumber={formData.plateNumber} size="md" />
            </div>

            {/* Terms */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleChange({
                      target: { name: "acceptTerms", type: "checkbox", checked },
                    } as any)
                  }
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I have read and agree to the terms and conditions
                </Label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button onClick={handleCreate} disabled={!formData.acceptTerms}>
                Create Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      {step < 3 && (
        <div className="flex justify-between max-w-2xl mx-auto w-full">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      )}
    </div>
  );
}
