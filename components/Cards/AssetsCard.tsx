import { ArrowDown, ArrowUp, Currency } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "../ui/table";
import Image from "next/image";
import { cn, formatNumber } from "@/lib/utils";
import { usePortfolioStore } from "@/lib/providers/portfolio-store-provider";

const AssetsCard = () => {
  const { assets } = usePortfolioStore((state) => state);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Currency className="w-5 h-5" /> Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-normal">Name</TableHead>
              <TableHead className="text-right font-normal">Amount</TableHead>
              <TableHead className="text-right font-normal">
                24h Change
              </TableHead>
              <TableHead className="text-right font-normal">Price</TableHead>
              <TableHead className="text-right font-normal">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No assets found
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset, index) => {
                // Mock data for 24h change - ideally this should come from the asset data
                // This is just a placeholder until real data is available
                const priceChange = Math.random() * 10 - 5; // Random value between -5 and 5
                const isPositive = priceChange >= 0;

                return (
                  <TableRow
                    key={index}
                    className={`border-b-0 ${
                      index % 2 === 0
                        ? "bg-primary/10 hover:bg-primary/20"
                        : "bg-secondary/10 hover:bg-secondary/20"
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          {asset.image && (
                            <Image
                              src={asset.image ?? null}
                              alt={asset.name || ""}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="flex flex-col">
                          <span className="text-base font-normal text-secondary-foreground">
                            {asset.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {asset.symbol}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatNumber(Number(asset.amount))} {asset.symbol}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        isPositive ? "text-green-600" : "text-red-600"
                      )}
                    >
                      <div className="flex items-center justify-end gap-1">
                        {isPositive ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {formatNumber(Math.abs(priceChange))}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${formatNumber(Number(asset.price))}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${formatNumber(Number(asset.total?.usd))}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssetsCard;
