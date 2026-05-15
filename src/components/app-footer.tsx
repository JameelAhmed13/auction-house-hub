import { Link } from "@tanstack/react-router";
import { Gavel, Mail, Phone, MapPin } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="border-t bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-gold">
              <Gavel className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">BK Cars Auctions</span>
          </div>
          <p className="mt-3 text-sm text-sidebar-foreground/70">
            The Middle East's premium automotive auction marketplace. Buy and sell with confidence.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Marketplace</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/70">
            <li><Link to="/inventory" className="hover:text-primary">Inventory</Link></li>
            <li><Link to="/todays-auctions" className="hover:text-primary">Today's Auctions</Link></li>
            <li><Link to="/upcoming-auctions" className="hover:text-primary">Upcoming</Link></li>
            <li><Link to="/locations" className="hover:text-primary">Locations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/70">
            <li><Link to="/about-us" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/why-choose-us" className="hover:text-primary">Why Choose Us</Link></li>
            <li><Link to="/contact-us" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-primary">Terms</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Get in touch</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@bkcars.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +971 4 234 5678</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Dubai, UAE</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-border py-4 text-center text-xs text-sidebar-foreground/50">
        © {new Date().getFullYear()} BK Cars Auctions. All rights reserved.
      </div>
    </footer>
  );
}
