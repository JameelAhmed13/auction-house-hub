import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import {
  User, Mail, Phone, CreditCard, Building2, MapPin, Calendar, Lock,
  Save, Camera, Activity, Trophy, Hash, Edit, Bell, Shield,
} from "lucide-react";
import { useAuth, updateUser } from "@/lib/auth-store";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    cnic: user?.cnic ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    ntn: user?.ntn ?? "",
    companyName: user?.companyName ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    updateUser(formData);
    toast.success("Profile updated successfully");
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Card>
          <CardContent className="p-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">Please sign in to view your profile</p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account information and preferences"
        actions={
          editing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Save Changes</Button>
            </div>
          ) : (
            <Button onClick={() => setEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT: Profile Summary */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-2xl font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge className="mt-2 capitalize" variant="outline">{user.role}</Badge>
            </div>

            <Separator />

            <div className="text-left space-y-2 text-sm">
              <DetailItem icon={CreditCard} label="CNIC" value={user.cnic} />
              <DetailItem icon={Phone} label="Phone" value={user.phone} />
              <DetailItem icon={Mail} label="Email" value={user.email} />
              {user.ntn && <DetailItem icon={Hash} label="NTN" value={user.ntn} />}
              {user.companyName && <DetailItem icon={Building2} label="Company" value={user.companyName} />}
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: Tabs with details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Info */}
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName" name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName" name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="cnic">CNIC</Label>
                      <Input
                        id="cnic" name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone" name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email" name="email" type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>
                  <Separator />
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="ntn">NTN <span className="text-xs text-muted-foreground">(Optional)</span></Label>
                      <Input
                        id="ntn" name="ntn"
                        value={formData.ntn}
                        onChange={handleChange}
                        disabled={!editing}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="companyName">Company <span className="text-xs text-muted-foreground">(Optional)</span></Label>
                      <Input
                        id="companyName" name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity */}
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Activity</CardTitle>
                  <CardDescription>Your bidding history and stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <ActivityCard icon={Activity} label="Total Bids" value="23" color="bg-blue-100 text-blue-700" />
                    <ActivityCard icon={Trophy} label="Auctions Won" value="5" color="bg-emerald-100 text-emerald-700" />
                    <ActivityCard icon={Hash} label="Active Plates" value="3" color="bg-amber-100 text-amber-700" />
                  </div>
                  <h4 className="font-semibold text-sm mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {[
                      { action: "Placed bid on AB 0001", time: "2 hours ago", icon: Activity },
                      { action: "Won auction for BAL 234", time: "1 day ago", icon: Trophy },
                      { action: "Applied for QT 0007", time: "3 days ago", icon: Hash },
                      { action: "Profile updated", time: "1 week ago", icon: User },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/40">
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.action}</div>
                          <div className="text-xs text-muted-foreground">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Password</div>
                        <div className="text-xs text-muted-foreground">Last changed 2 months ago</div>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/change-password">Change Password</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Two-Factor Authentication</div>
                        <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Login Alerts</div>
                        <div className="text-xs text-muted-foreground">Get notified of new sign-ins</div>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <PrefRow icon={Bell} label="Email notifications" />
                  <PrefRow icon={Bell} label="SMS notifications" />
                  <PrefRow icon={MapPin} label="District-based recommendations" />
                  <PrefRow icon={Calendar} label="Auction reminders" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground text-xs">{label}:</span>
      <span className="font-medium ml-auto truncate">{value}</span>
    </div>
  );
}

function ActivityCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-lg border">
      <div className={`h-9 w-9 rounded-lg ${color} flex items-center justify-center mb-2`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function PrefRow({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/40">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <input type="checkbox" defaultChecked className="rounded" />
    </div>
  );
}
