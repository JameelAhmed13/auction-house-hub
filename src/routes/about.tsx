import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Shield, Award, Users, Globe, Activity, CheckCircle2, Mail, Phone, MapPin,
} from "lucide-react";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/10">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-6">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400 border-0">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Empowering <span className="text-amber-400">Transparent</span> Auctions
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            The official government E-Auction platform of Balochistan's Excise, Taxation & Narcotics Control Department.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Mission */}
        <Card>
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Badge variant="outline" className="mb-3">Our Mission</Badge>
                <h2 className="text-3xl font-bold mb-3">Modernizing Vehicle Registration</h2>
                <p className="text-muted-foreground">
                  We're committed to bringing transparency, efficiency, and accessibility to the vehicle
                  registration auction process. Our platform empowers citizens of Balochistan to bid on
                  exclusive registration plates from anywhere in Pakistan.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "100% Government Verified Auctions",
                  "Anonymous & Transparent Bidding",
                  "Real-time Live Auction System",
                  "Secure Payment Processing",
                  "Fair & Open to All Citizens",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: Users, value: "12,400+", label: "Active Bidders" },
            { icon: Activity, value: "500+", label: "Daily Auctions" },
            { icon: Award, value: "98.5%", label: "Success Rate" },
            { icon: Globe, value: "29", label: "Districts" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <section>
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3">Our Values</Badge>
            <h2 className="text-3xl font-bold">What We Stand For</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "Trust", desc: "Backed by government oversight and verified protocols ensuring every auction is fair and tamper-free." },
              { icon: Activity, title: "Transparency", desc: "Anonymous bidding with publicly verifiable results. Every bid is timestamped and recorded." },
              { icon: Award, title: "Excellence", desc: "Premium plates at competitive prices with seamless user experience from registration to ownership." },
            ].map((v) => (
              <Card key={v.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact info */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Get In Touch</h2>
              <p className="text-sm text-muted-foreground mt-1">We're here to help</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <ContactItem icon={Mail} label="Email" value="support@eauction.gov.pk" />
              <ContactItem icon={Phone} label="Helpline" value="+92 81 9201234" />
              <ContactItem icon={MapPin} label="Office" value="Quetta, Balochistan, Pakistan" />
            </div>
            <div className="flex justify-center mt-6">
              <Button asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="text-center p-4 rounded-lg border">
      <Icon className="h-5 w-5 mx-auto text-primary mb-2" />
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
