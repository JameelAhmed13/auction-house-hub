import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar } from "lucide-react";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-muted/10">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400 border-0 mb-3">
            <Shield className="h-3 w-3 mr-1" />
            Privacy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            Last updated: May 15, 2026
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <Card>
          <CardContent className="p-8 prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold">Introduction</h2>
            <p>
              The Balochistan Excise, Taxation & Narcotics Control Department ("we", "our", "us") respects
              your privacy. This Privacy Policy explains how we collect, use, and protect your information
              when you use the E-Auction platform.
            </p>

            <h2 className="text-2xl font-bold mt-6">1. Information We Collect</h2>
            <h3 className="text-lg font-semibold mt-3">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name, CNIC number, NTN (if applicable)</li>
              <li>Email address and phone number</li>
              <li>District/city of residence</li>
              <li>Payment information (processed by 1-Bill, not stored)</li>
            </ul>
            <h3 className="text-lg font-semibold mt-3">Activity Data</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Bid history and auction participation</li>
              <li>Login times and IP addresses</li>
              <li>Device and browser information</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To verify your identity and CNIC eligibility</li>
              <li>To process bids and auction transactions</li>
              <li>To communicate auction status, payment reminders, and notifications</li>
              <li>To prevent fraud and ensure platform security</li>
              <li>To comply with legal obligations and government regulations</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">3. Anonymous Bidding</h2>
            <p>
              For transparency, your bids are displayed publicly using <strong>anonymized bidder codes</strong>
              (e.g., BID-A4F2). Your real name, CNIC, or contact info are <strong>never</strong> revealed to
              other users during active auctions. Once you win, only your masked AIN (Application Identification
              Number) is shown in public winner lists.
            </p>

            <h2 className="text-2xl font-bold mt-6">4. Information Sharing</h2>
            <p>We do <strong>not</strong> sell your data. We share information only with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Government regulators (when legally required)</li>
              <li>Payment processors (1-Bill, partner banks) for transactions</li>
              <li>Identity verification services (NADRA)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">5. Data Security</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All data is encrypted in transit using TLS 1.3</li>
              <li>Sensitive fields are encrypted at rest</li>
              <li>Access is restricted to authorized government personnel</li>
              <li>Regular security audits and penetration testing</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccuracies in your data</li>
              <li>Request deletion (subject to legal retention requirements)</li>
              <li>Opt-out of non-essential communications</li>
              <li>File a complaint with regulatory authorities</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">7. Data Retention</h2>
            <p>
              We retain personal data as long as your account is active or as required by Pakistani law.
              Auction records are kept indefinitely for legal compliance. Inactive accounts may be archived
              after 24 months of inactivity.
            </p>

            <h2 className="text-2xl font-bold mt-6">8. Cookies & Tracking</h2>
            <p>
              We use essential cookies for authentication and session management. We do not use third-party
              advertising or behavioral tracking cookies.
            </p>

            <h2 className="text-2xl font-bold mt-6">9. Children's Privacy</h2>
            <p>
              The platform is restricted to users 18 years and older. We do not knowingly collect data from
              minors. If we discover such data, it will be deleted immediately.
            </p>

            <h2 className="text-2xl font-bold mt-6">10. Updates to Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Significant changes will be notified to
              users via email and platform announcements.
            </p>

            <h2 className="text-2xl font-bold mt-6">11. Contact Us</h2>
            <p>
              For privacy questions or to exercise your rights:<br />
              📧 <a href="mailto:privacy@eauction.gov.pk" className="text-primary hover:underline">
                privacy@eauction.gov.pk
              </a><br />
              📞 +92 81 9201234
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
