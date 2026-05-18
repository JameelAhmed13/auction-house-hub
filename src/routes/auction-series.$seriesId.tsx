import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { auctionSeries, getMarksBySeriesId } from "@/lib/dummy-data";
import { useState } from "react";

export const Route = createFileRoute("/auction-series/$seriesId")({ component: SeriesNumberSelectionPage });

function SeriesNumberSelectionPage() {
  const { seriesId } = useParams({ from: "/auction-series/$seriesId" });
  const series = auctionSeries.find((s) => s.id === seriesId);
  const marks = getMarksBySeriesId(seriesId);

  const [selectedMarks, setSelectedMarks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  if (!series) {
    return (
      <div className="space-y-6">
        <PageHeader title="Series Not Found" subtitle="The requested series does not exist" />
      </div>
    );
  }

  const filteredMarks = marks.filter((mark) =>
    mark.mark.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMark = (markId: string) => {
    setSelectedMarks((prev) =>
      prev.includes(markId) ? prev.filter((id) => id !== markId) : [...prev, markId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMarks.length === filteredMarks.length) {
      setSelectedMarks([]);
    } else {
      setSelectedMarks(filteredMarks.map((m) => m.id));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${series.category} (${series.code})`}
        subtitle="Select Registration Mark of Choice"
      />

      {/* Search and Filter */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search">Search by Reg Mark or Price</Label>
          <Input
            id="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedMarks.length === filteredMarks.length && filteredMarks.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Registration Mark</TableHead>
              <TableHead className="text-right">Reserve Price (PKR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMarks.map((mark) => (
              <TableRow key={mark.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedMarks.includes(mark.id)}
                    onCheckedChange={() => toggleMark(mark.id)}
                  />
                </TableCell>
                <TableCell className="font-semibold font-mono text-lg">{mark.mark}</TableCell>
                <TableCell className="text-right font-semibold">
                  {mark.reservePrice.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredMarks.length} of {marks.length} entries</span>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          disabled={selectedMarks.length === 0}
          className="min-w-48"
        >
          Apply for {selectedMarks.length} Selected
        </Button>
      </div>
    </div>
  );
}
