import { Currency } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "../ui/table";
import { usePortfolioContext } from "@/lib/contexts/usePortfolioState";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";

const AssetsCard = () => {
  const { portfolio } = usePortfolioContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Currency className="w-4 h-4" /> Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.assets.map((asset) => (
              <TableRow key={asset.address}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={asset.image || ""}
                      alt={asset.name || ""}
                      width={28}
                      height={28}
                    />

                    <span className="text-base font-medium text-secondary-foreground">
                      {asset.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {asset.symbol}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(Number(asset.amount))}
                </TableCell>
                <TableCell className="text-right">{""}</TableCell>
                <TableCell className="text-right">
                  ${formatNumber(Number(asset.price))}
                </TableCell>
                <TableCell className="text-right">
                  ${formatNumber(Number(asset.total?.usd))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssetsCard;
