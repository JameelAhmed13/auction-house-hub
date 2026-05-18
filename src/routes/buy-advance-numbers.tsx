import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/buy-advance-numbers")({ component: BuyAdvanceNumbersPage });

function BuyAdvanceNumbersPage() {
  const [category, setCategory] = useState("");
  const [regNo, setRegNo] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!category || !regNo) {
      toast.error("Please fill in all fields");
      return;
    }
    setSearched(true);
    toast.success("Search results loaded");
  };

  const handleReset = () => {
    setCategory("");
    setRegNo("");
    setSearched(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Buy Advance Numbers"
          subtitle="Pre-reserve registration numbers"
        />
        <Button asChild variant="outline">
          <Link to="/advance-numbers">My Advance Numbers</Link>
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="border border-border/60">
        <CardContent className="p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Motor Cycle">Motor Cycle</SelectItem>
                  <SelectItem value="Motor Car">Motor Car</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regNo">Registration No.</Label>
              <Input
                id="regNo"
                placeholder="e.g., BAL 100"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {!searched ? (
        <Card className="border border-border/60">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              💡 Perform search to get advance numbers
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Category</th>
                    <th className="text-left px-4 py-3 font-semibold">Registration No.</th>
                    <th className="text-left px-4 py-3 font-semibold">Price (PKR)</th>
                    <th className="text-right px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { category: "Motor Car", regNo: "BAL 100", price: 25000 },
                    { category: "Motor Car", regNo: "BAL 101", price: 28000 },
                    { category: "Motor Car", regNo: "BAL 102", price: 22000 },
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/30">
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3 font-semibold">{item.regNo}</td>
                      <td className="px-4 py-3">{item.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
