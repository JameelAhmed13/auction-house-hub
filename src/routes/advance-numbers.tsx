import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { advanceNumbers } from "@/lib/dummy-data";

export const Route = createFileRoute("/advance-numbers")({ component: AdvanceNumbersPage });

function AdvanceNumbersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Advance Numbers"
          subtitle="Pre-reserved registration numbers"
        />
        <Button asChild>
          <Link to="/buy-advance-numbers">Request New Advance Number</Link>
        </Button>
      </div>

      {advanceNumbers.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No advance numbers found. Start by requesting a new one.
          </CardContent>
        </Card>
      ) : (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Registration No.</TableHead>
                <TableHead>CNIC</TableHead>
                <TableHead>NTN</TableHead>
                <TableHead>PSID</TableHead>
                <TableHead>PSID Expiry</TableHead>
                <TableHead>Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advanceNumbers.map((num, index) => (
                <TableRow key={num.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{num.category}</TableCell>
                  <TableCell className="font-semibold">{num.registrationNumber}</TableCell>
                  <TableCell className="font-mono text-sm">{num.requestedBy}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-mono text-sm">{num.psid}</TableCell>
                  <TableCell className="text-sm">{num.psidExpiry}</TableCell>
                  <TableCell>
                    <Badge variant={num.paymentStatus === "paid" ? "default" : "secondary"}>
                      {num.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
