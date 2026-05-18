import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { winners, VehicleCategory } from "@/lib/dummy-data";

export const Route = createFileRoute("/winners")({ component: WinnersPage });

function WinnersPage() {
  const categories: VehicleCategory[] = ["Motor Cycle", "Motor Car", "Commercial"];

  const filterWinners = (category: VehicleCategory) => {
    return winners.filter((w) => w.category === category);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Winners"
        subtitle="View auction winners and results"
      />

      <Tabs defaultValue="Motor Cycle">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const categoryWinners = filterWinners(category);
          return (
            <TabsContent key={category} value={category} className="mt-6">
              {categoryWinners.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No winners found for {category}
                  </CardContent>
                </Card>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Sr. No.</TableHead>
                        <TableHead>Series</TableHead>
                        <TableHead>Auction Start</TableHead>
                        <TableHead>Auction End</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryWinners.map((winner, index) => (
                        <TableRow key={winner.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-semibold">{winner.seriesCode}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {winner.auctionStartDate}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {winner.auctionEndDate}
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                    Winner List — {winner.seriesCode}
                                  </DialogTitle>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Auction End Date: {winner.auctionEndDate}
                                  </p>
                                </DialogHeader>
                                <div className="border rounded-lg overflow-x-auto">
                                  <Table>
                                    <TableHeader className="bg-muted/50">
                                      <TableRow>
                                        <TableHead>Sr. No.</TableHead>
                                        <TableHead>Series Number</TableHead>
                                        <TableHead>Reserve Price</TableHead>
                                        <TableHead>Highest Bid</TableHead>
                                        <TableHead>Winner AIN</TableHead>
                                        <TableHead>Owner Name</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell className="font-semibold">
                                          {winner.registrationNumber}
                                        </TableCell>
                                        <TableCell>PKR {winner.reservePrice.toLocaleString()}</TableCell>
                                        <TableCell className="text-primary font-semibold">
                                          PKR {winner.highestBid.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                          {winner.winnerAin}
                                        </TableCell>
                                        <TableCell>{winner.winnerName}</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
