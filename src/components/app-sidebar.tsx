import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Gavel, Car, Heart, Tag, Wallet, CreditCard, Settings,
  Building2, MapPin, BadgeCheck, ClipboardList, Coins, FileText, ShoppingBag,
  Trophy, XCircle, Clock, Hourglass, Banknote, ReceiptText, RefreshCcw, Repeat2,
  PackagePlus, ChevronDown,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-store";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Item = { title: string; url: string; icon: any };
type Group = { label: string; items: Item[] };

const buyerGroups: Group[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Saved Vehicles", url: "/saved-vehicles", icon: Heart },
    ],
  },
  {
    label: "Auctions",
    items: [
      { title: "Today's Auctions", url: "/todays-auctions", icon: Gavel },
      { title: "Upcoming", url: "/upcoming-auctions", icon: Clock },
      { title: "Live Joined", url: "/live-joined-auctions", icon: BadgeCheck },
      { title: "Online Joined", url: "/online-joined-auctions", icon: ClipboardList },
      { title: "Inventory", url: "/inventory", icon: Car },
    ],
  },
  {
    label: "Bids",
    items: [
      { title: "Current Bids", url: "/current-bids", icon: Tag },
      { title: "Bids Won", url: "/bids-won", icon: Trophy },
      { title: "Bids Lost", url: "/bids-lost", icon: XCircle },
    ],
  },
  {
    label: "Offers",
    items: [
      { title: "My Offers", url: "/my-offers", icon: Tag },
      { title: "Current Offers", url: "/current-offers", icon: Hourglass },
      { title: "Offers Won", url: "/offers-won", icon: Trophy },
      { title: "Offers Lost", url: "/offers-lost", icon: XCircle },
      { title: "Offers Expired", url: "/offers-expired", icon: Clock },
    ],
  },
  {
    label: "Payments",
    items: [
      { title: "Due Payments", url: "/due-payments", icon: Banknote },
      { title: "Paid Payments", url: "/paid-payments", icon: ReceiptText },
    ],
  },
];

const sellerGroups: Group[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Inventory",
    items: [
      { title: "Add Vehicle", url: "/add-new-vehicles", icon: PackagePlus },
      { title: "Pending", url: "/pending-vehicles", icon: Hourglass },
      { title: "Approved", url: "/approved-vehicles", icon: BadgeCheck },
      { title: "Sold", url: "/sold-vehicles", icon: Trophy },
      { title: "Rejected", url: "/rejected-vehicles", icon: XCircle },
      { title: "Cancelled", url: "/canceled-vehicles", icon: XCircle },
    ],
  },
  {
    label: "Invoices",
    items: [
      { title: "Pending Invoices", url: "/pending-invoices", icon: FileText },
      { title: "Settled Invoices", url: "/settled-invoices", icon: ReceiptText },
    ],
  },
];

const sharedGroups: Group[] = [
  {
    label: "Deposit & Plans",
    items: [
      { title: "Deposit Plans", url: "/deposit-plans", icon: Coins },
      { title: "Deposit Invoices", url: "/security-deposit/deposit-invoices", icon: Wallet },
      { title: "Refund Invoices", url: "/security-deposit/refund-invoices", icon: RefreshCcw },
      { title: "Deposit History", url: "/deposit-history", icon: ClipboardList },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: Settings },
      { title: "Billing Address", url: "/billing-address", icon: MapPin },
      { title: "Payout Address", url: "/payout-address", icon: MapPin },
      { title: "Payment Methods", url: "/payment-methods", icon: CreditCard },
      { title: "Cards", url: "/cards-management", icon: CreditCard },
      { title: "Payout Details", url: "/payout-details", icon: Banknote },
      { title: "Pickup Locations", url: "/cash-pickup-locations", icon: Building2 },
      { title: "Update Password", url: "/update-password", icon: Settings },
    ],
  },
  {
    label: "Switch Role",
    items: [
      { title: "To Buyer", url: "/switch-to-buyer", icon: Repeat2 },
      { title: "To Seller", url: "/switch-from-only-buyer-to-seller", icon: Repeat2 },
      { title: "To Organization", url: "/switch-to-organization", icon: Building2 },
      { title: "To Individual", url: "/switch-to-individual-seller", icon: Repeat2 },
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const groups = (user?.currentMode === "seller" ? sellerGroups : buyerGroups).concat(sharedGroups);

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-gold text-sidebar-primary-foreground shadow-lg">
            <Gavel className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold tracking-tight text-sidebar-foreground">BK Cars</span>
              <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Auctions</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-1">
        {groups.map((g) => {
          const hasActive = g.items.some((i) => path === i.url);
          return (
            <Collapsible key={g.label} defaultOpen={hasActive || g.label === "Overview"}>
              <SidebarGroup>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="group/label flex w-full cursor-pointer items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/60 hover:text-sidebar-foreground">
                    {g.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=closed]/label:-rotate-90" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {g.items.map((item) => {
                        const active = path === item.url;
                        return (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                              <Link to={item.url} className="flex items-center gap-3">
                                <item.icon className="h-4 w-4 shrink-0" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
