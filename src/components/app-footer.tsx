import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Top: Links grid */}
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                ب
              </div>
              <div>
                <div className="text-sm font-bold">E-Auction</div>
                <div className="text-[10px] text-muted-foreground">Balochistan Excise</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Official government auction platform for vehicle registration plates in Balochistan.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Platform</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li><Link to="/inventory" className="hover:text-primary">Inventory</Link></li>
              <li><Link to="/auctions" className="hover:text-primary">Auctions</Link></li>
              <li><Link to="/how-to-auction" className="hover:text-primary">How to Bid</Link></li>
              <li><Link to="/winners" className="hover:text-primary">Past Winners</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Get in touch</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>support@eauction.gov.pk</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>+92 81 9201234</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>Quetta, Balochistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-4 border-t flex flex-col items-center justify-between gap-2 text-center md:flex-row">
          <p className="text-xs text-muted-foreground">
            © All Rights Reserved {new Date().getFullYear()} · Balochistan Excise Department
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Balochistan Information Technology Board
          </p>
        </div>
      </div>
    </footer>
  );
}
