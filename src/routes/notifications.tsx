import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import {
  Bell, Check, Trash2, Settings, Gavel, AlertCircle, Trophy, FileText, DollarSign, CheckCircle2,
} from "lucide-react";
import { notifications } from "@/lib/dummy-data";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });

const typeIcons: Record<string, any> = {
  application: FileText,
  payment: DollarSign,
  auction: Gavel,
  system: AlertCircle,
};

const typeColors: Record<string, string> = {
  application: "bg-blue-100 text-blue-700",
  payment: "bg-amber-100 text-amber-700",
  auction: "bg-emerald-100 text-emerald-700",
  system: "bg-purple-100 text-purple-700",
};

function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const [activeTab, setActiveTab] = useState("all");

  const filtered = items.filter((n) => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "read") return n.read;
    if (activeTab !== "all") return n.type === activeTab;
    return true;
  });

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: string) => {
    setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteOne = (id: string) => {
    setItems(items.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle={`You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/profile">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Link>
            </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="unread">
            <Bell className="h-3.5 w-3.5 mr-1.5" />
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="application">Applications</TabsTrigger>
          <TabsTrigger value="payment">Payments</TabsTrigger>
          <TabsTrigger value="auction">Auctions</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                <h3 className="font-semibold mb-1">All caught up!</h3>
                <p className="text-sm text-muted-foreground">No notifications to show</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filtered.map((n) => {
                const Icon = typeIcons[n.type] || Bell;
                const iconColor = typeColors[n.type] || "bg-gray-100 text-gray-700";
                return (
                  <Card
                    key={n.id}
                    className={cn(
                      "transition-all hover:shadow-md",
                      !n.read && "border-l-4 border-l-primary bg-primary/5"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-lg ${iconColor} flex items-center justify-center shrink-0`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                {n.title}
                                {!n.read && (
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {new Date(n.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline" className="text-[10px] capitalize">
                              {n.type}
                            </Badge>
                            <div className="ml-auto flex gap-1">
                              {!n.read && (
                                <Button
                                  variant="ghost" size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => markRead(n.id)}
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                              <Button
                                variant="ghost" size="icon"
                                className="h-7 w-7 text-red-600 hover:bg-red-50"
                                onClick={() => deleteOne(n.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
