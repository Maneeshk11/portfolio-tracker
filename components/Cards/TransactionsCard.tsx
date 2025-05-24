import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDownRight, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import {
  TableHead,
  TableRow,
  TableHeader,
  Table,
  TableBody,
  TableCell,
} from "../ui/table";
import { usePortfolioContext } from "@/lib/contexts/usePortfolioState";
import { useAccount } from "wagmi";
import Image from "next/image";
const TransactionsCard = () => {
  const { portfolio } = usePortfolioContext();
  const { address } = useAccount();

  // Format currency with 2 decimal places
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  // Format date with a more readable format
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <ArrowLeftRight className="w-4 h-4" />
          <span>Transactions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Asset</TableHead>
              <TableHead className="font-medium text-right">
                Current Value
              </TableHead>
              <TableHead className="font-medium text-right">Amount</TableHead>
              <TableHead className="font-medium text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.transactions.map((transaction) => (
              <TableRow key={transaction.uniqueId}>
                <TableCell className="font-medium text-base">
                  {transaction.from === address?.toLowerCase() ? (
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <span>Sent</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                      <span>Received</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-semibold flex items-center gap-2">
                  <Image
                    src={
                      portfolio.assets.find(
                        (asset) => asset.symbol === transaction.asset
                      )?.image ?? ""
                    }
                    alt={transaction.asset ?? ""}
                    width={20}
                    height={20}
                  />{" "}
                  {transaction.asset}
                </TableCell>
                <TableCell className="font-semibold text-right">
                  ${formatCurrency(Number(transaction.value))}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(Number(transaction.value))}{" "}
                  {transaction.asset}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatDate(transaction.metadata.blockTimestamp.toString())}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
