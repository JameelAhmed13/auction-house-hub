import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar } from "lucide-react";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/10">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-400 border-0 mb-3">
            <FileText className="h-3 w-3 mr-1" />
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms & Conditions</h1>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            Last updated: May 15, 2026
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <Card>
          <CardContent className="p-8 prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Balochistan E-Auction platform ("the Platform"), you agree to be
              bound by these Terms and Conditions. If you do not agree, please do not use the Platform.
            </p>

            <h2 className="text-2xl font-bold mt-6">2. Eligibility</h2>
            <p>
              You must be at least 18 years old and a citizen of Pakistan with a valid CNIC to register
              and bid on the Platform. All information provided during registration must be accurate and complete.
            </p>

            <h2 className="text-2xl font-bold mt-6">3. Account Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>All activities under your account are your sole responsibility.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
              <li>One person may only register one account.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">4. Bidding Rules</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All bids placed are legally binding and cannot be retracted.</li>
              <li>Minimum bid increment is set per auction by the platform administrators.</li>
              <li>In live auctions, a 5-second countdown begins after each bid, plus a 5-second bonus.</li>
              <li>The highest bidder when the auction closes wins the plate.</li>
              <li>Bidding identities are anonymized using bidder codes for transparency.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">5. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Winning bidders must pay within 7 days using the provided PSID.</li>
              <li>Payments are processed through 1-Bill or partner banks.</li>
              <li>Failure to pay results in forfeiture of the bid and potential account suspension.</li>
              <li>All sales are final. No refunds are issued once payment is confirmed.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">6. Registration Fees</h2>
            <p>
              Each auction has a non-refundable registration fee. This fee must be paid before bidding
              is enabled for that auction.
            </p>

            <h2 className="text-2xl font-bold mt-6">7. Prohibited Conduct</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Creating multiple accounts or sharing credentials.</li>
              <li>Attempting to manipulate auction results through fraud or collusion.</li>
              <li>Using bots or automated bidding tools.</li>
              <li>Disrupting the platform or other users' experience.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">8. Privacy & Data</h2>
            <p>
              We collect and process personal data in accordance with our{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. Your CNIC
              and contact information are kept secure and used only for verification and communication.
            </p>

            <h2 className="text-2xl font-bold mt-6">9. Platform Modifications</h2>
            <p>
              The Excise Department reserves the right to modify, suspend, or discontinue any aspect
              of the Platform at any time, with or without notice.
            </p>

            <h2 className="text-2xl font-bold mt-6">10. Limitation of Liability</h2>
            <p>
              The Platform is provided "as is". The Excise Department is not liable for any indirect,
              incidental, or consequential damages arising from the use of the Platform.
            </p>

            <h2 className="text-2xl font-bold mt-6">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes
              shall be subject to the exclusive jurisdiction of the courts in Quetta, Balochistan.
            </p>

            <h2 className="text-2xl font-bold mt-6">12. Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:support@eauction.gov.pk" className="text-primary hover:underline">
                support@eauction.gov.pk
              </a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
