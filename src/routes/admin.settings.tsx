import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/page-header";
import {
  Settings, Bell, Shield, Globe, Mail, DollarSign, Database, Save, RefreshCcw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettingsPage });

function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Settings"
        subtitle="Configure system-wide settings and preferences"
        actions={
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <><RefreshCcw className="h-4 w-4 mr-2 animate-spin" />Saving...</>
            ) : (
              <><Save className="h-4 w-4 mr-2" />Save Changes</>
            )}
          </Button>
        }
      />

      <Tabs defaultValue="general" orientation="vertical" className="flex gap-6 flex-col md:flex-row">
        <TabsList className="flex md:flex-col h-auto justify-start bg-card border rounded-lg p-1 md:w-56 md:sticky md:top-24">
          <TabsTrigger value="general" className="w-full justify-start data-[state=active]:bg-primary/10">
            <Settings className="h-4 w-4 mr-2" /> General
          </TabsTrigger>
          <TabsTrigger value="auctions" className="w-full justify-start data-[state=active]:bg-primary/10">
            <DollarSign className="h-4 w-4 mr-2" /> Auctions
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start data-[state=active]:bg-primary/10">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start data-[state=active]:bg-primary/10">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="emails" className="w-full justify-start data-[state=active]:bg-primary/10">
            <Mail className="h-4 w-4 mr-2" /> Email Templates
          </TabsTrigger>
          <TabsTrigger value="system" className="w-full justify-start data-[state=active]:bg-primary/10">
            <Database className="h-4 w-4 mr-2" /> System
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 space-y-6">
          {/* General Settings */}
          <TabsContent value="general" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Platform Name</Label>
                    <Input defaultValue="Balochistan E-Auction" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Department</Label>
                    <Input defaultValue="Excise, Taxation & Narcotics Control" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Platform Description</Label>
                  <Textarea
                    rows={3}
                    defaultValue="Government E-Auction system for vehicle registration plates in Balochistan."
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ur">Urdu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Timezone</Label>
                    <Select defaultValue="pk">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pk">PKT — Pakistan (UTC+5)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <SwitchRow
                  label="Maintenance Mode"
                  description="Take the platform offline for maintenance"
                  defaultChecked={false}
                />
                <SwitchRow
                  label="Public Registration"
                  description="Allow new users to register accounts"
                  defaultChecked={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auctions Settings */}
          <TabsContent value="auctions" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Auction Settings
                </CardTitle>
                <CardDescription>Configure default auction behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Default Bid Increment (PKR)</Label>
                    <Input type="number" defaultValue={5000} />
                    <p className="text-xs text-muted-foreground">Minimum bid increase amount</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Default Registration Fee (PKR)</Label>
                    <Input type="number" defaultValue={1500} />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Live Countdown (seconds)</Label>
                    <Input type="number" defaultValue={5} />
                    <p className="text-xs text-muted-foreground">Timer after each bid</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Bonus Countdown (seconds)</Label>
                    <Input type="number" defaultValue={5} />
                    <p className="text-xs text-muted-foreground">Bonus time when no new bids</p>
                  </div>
                </div>
                <Separator />
                <SwitchRow
                  label="Auto-extend Auctions"
                  description="Extend auction time if bids placed near end"
                  defaultChecked={true}
                />
                <SwitchRow
                  label="Allow Pre-Bidding"
                  description="Users can place bids before auction starts"
                  defaultChecked={true}
                />
                <SwitchRow
                  label="Anonymous Bidding"
                  description="Show bidder codes instead of names for transparency"
                  defaultChecked={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Control how and when notifications are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <h4 className="font-semibold text-sm">For Users</h4>
                <SwitchRow label="New Auction Alerts" description="Notify users when new auctions launch" defaultChecked={true} />
                <SwitchRow label="Outbid Alerts" description="Notify users when they've been outbid" defaultChecked={true} />
                <SwitchRow label="Winning Notifications" description="Notify users when they win an auction" defaultChecked={true} />
                <SwitchRow label="Payment Reminders" description="Send payment due reminders" defaultChecked={true} />

                <Separator />

                <h4 className="font-semibold text-sm">For Admins</h4>
                <SwitchRow label="New Application Alerts" description="Notify admins of new applications" defaultChecked={true} />
                <SwitchRow label="High-Value Bid Alerts" description="Alert when bids exceed threshold" defaultChecked={true} />
                <SwitchRow label="Suspicious Activity" description="Alert on unusual bidding patterns" defaultChecked={true} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>Authentication and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Session Timeout (minutes)</Label>
                    <Input type="number" defaultValue={30} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Max Login Attempts</Label>
                    <Input type="number" defaultValue={5} />
                  </div>
                </div>
                <Separator />
                <SwitchRow label="Two-Factor Authentication" description="Require 2FA for admin accounts" defaultChecked={true} />
                <SwitchRow label="CAPTCHA on Login" description="Require CAPTCHA verification" defaultChecked={true} />
                <SwitchRow label="OTP for Sensitive Actions" description="Require OTP for high-value bids" defaultChecked={true} />
                <SwitchRow label="IP Whitelisting" description="Restrict admin access to whitelisted IPs" defaultChecked={false} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Templates */}
          <TabsContent value="emails" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Templates
                </CardTitle>
                <CardDescription>Customize automated emails sent to users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Welcome Email", desc: "Sent when a new user registers", count: 124 },
                  { name: "Bid Confirmation", desc: "Sent after each bid placement", count: 2841 },
                  { name: "Outbid Notification", desc: "Sent when user is outbid", count: 1532 },
                  { name: "Auction Win", desc: "Sent when user wins an auction", count: 89 },
                  { name: "Payment Reminder", desc: "Sent when payment is due", count: 245 },
                  { name: "Password Reset", desc: "Sent on password reset request", count: 67 },
                ].map((tpl) => (
                  <div key={tpl.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/40">
                    <div>
                      <div className="font-medium text-sm">{tpl.name}</div>
                      <div className="text-xs text-muted-foreground">{tpl.desc} · Sent {tpl.count} times this month</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* System */}
          <TabsContent value="system" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  System Information
                </CardTitle>
                <CardDescription>Platform health and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 md:grid-cols-2">
                  <InfoBox label="Platform Version" value="v2.4.1" />
                  <InfoBox label="Database Size" value="2.4 GB" />
                  <InfoBox label="Uptime" value="99.9%" />
                  <InfoBox label="Last Backup" value="2026-05-15 04:00" />
                </div>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Maintenance Actions</h4>
                  <div className="grid gap-2 md:grid-cols-3">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Cache cleared")}>
                      Clear Cache
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Backup started")}>
                      Backup Now
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Reports generating")}>
                      Generate Reports
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function SwitchRow({
  label, description, defaultChecked = false,
}: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <Label className="font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-muted/40 border">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="text-lg font-bold mt-1">{value}</div>
    </div>
  );
}
