import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/lib/auth-store";
import { toast } from "sonner";
import { useState } from "react";
import { User, CreditCard, FileText, Building2, Phone, Mail, Lock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "Muhammad",
    lastName: "Hassan",
    cnic: "42301-1234567-1",
    ntn: "3530189-2",
    companyName: "",
    phone: "+923001234567",
    email: "hassan@example.pk",
    password: "••••••••",
    confirmPassword: "••••••••",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    login({
      firstName: formData.firstName,
      lastName: formData.lastName,
      cnic: formData.cnic,
      phone: formData.phone,
      email: formData.email,
      ntn: formData.ntn,
      companyName: formData.companyName || undefined,
    });
    toast.success("Account created successfully!");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold">Create Your Account</h2>
          <p className="text-sm text-muted-foreground">
            Join thousands of users on E-Auction
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Row */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Your name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10 h-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cnic" className="text-sm font-medium">CNIC</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="cnic"
                  name="cnic"
                  type="text"
                  placeholder="12345-1234567-1"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="pl-10 h-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* NTN and Company Row */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ntn" className="text-sm font-medium">NTN <span className="text-xs text-muted-foreground">(Optional)</span></Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="ntn"
                  name="ntn"
                  type="text"
                  placeholder="NTN Number"
                  value={formData.ntn}
                  onChange={handleChange}
                  className="pl-10 h-10"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="companyName" className="text-sm font-medium">Company <span className="text-xs text-muted-foreground">(Optional)</span></Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="pl-10 h-10"
                />
              </div>
            </div>
          </div>

          {/* Phone and Email Row */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+923xxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 h-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Row */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 h-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 h-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))
              }
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-xs font-normal leading-relaxed cursor-pointer">
              I have read and agree to the{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Create Account
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
