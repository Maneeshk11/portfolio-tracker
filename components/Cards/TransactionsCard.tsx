import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpRight,
  ExternalLink,
  MoveHorizontal,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import formatAddress from "@/lib/address/utils";
import Link from "next/link";
import { fromHex } from "viem";
import { Separator } from "../ui/separator";
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
        <Table className="rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="font-normal">Type</TableHead>
              <TableHead className="font-normal">Asset</TableHead>
              <TableHead className="font-normal text-right">
                Current Value
              </TableHead>
              <TableHead className="font-normal text-right">Amount</TableHead>
              <TableHead className="font-normal text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.transactions.map((transaction, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <TableRow
                    key={index}
                    className={`border-b-0 cursor-pointer ${
                      index % 2 === 0
                        ? "bg-primary/10 hover:bg-primary/20"
                        : "bg-secondary/10 hover:bg-secondary/20"
                    }`}
                  >
                    <TableCell className="font-normal text-base ">
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
                      $
                      {formatCurrency(
                        Number(transaction.value) *
                          (portfolio.assets.find(
                            (asset) => asset.symbol === transaction.asset
                          )?.price ?? 0)
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(Number(transaction.value))}{" "}
                      {transaction.asset}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatDate(
                        transaction.metadata.blockTimestamp.toString()
                      )}
                    </TableCell>
                  </TableRow>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                  </DialogHeader>
                  <DialogDescription
                    className="flex items-center gap-2"
                    asChild
                  >
                    <div className="flex items-center gap-2">
                      {transaction.from === address?.toLowerCase() ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span>
                        {transaction.from === address?.toLowerCase() ? (
                          <>
                            Sent to{" "}
                            <Link
                              href={`https://etherscan.io/address/${transaction.to}`}
                              target="_blank"
                            >
                              <span className="text-primary hover:underline">
                                {formatAddress(transaction.to ?? "")}
                              </span>
                            </Link>
                          </>
                        ) : (
                          <>
                            Received from{" "}
                            <Link
                              href={`https://etherscan.io/address/${transaction.from}`}
                              target="_blank"
                            >
                              <span className="text-primary hover:underline">
                                {formatAddress(transaction.from ?? "")}
                              </span>
                            </Link>
                          </>
                        )}
                      </span>
                    </div>
                  </DialogDescription>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full rounded-lg bg-primary/10 p-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            portfolio.assets.find(
                              (asset) => asset.symbol === transaction.asset
                            )?.image ?? ""
                          }
                          alt={transaction.asset ?? ""}
                          width={20}
                          height={20}
                        />
                        <span>{transaction.asset}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          {transaction.value} {transaction.asset}
                        </span>
                        <MoveHorizontal className="w-4 h-4" />
                        <span>
                          {" "}
                          $
                          {formatCurrency(
                            Number(transaction.value) *
                              (portfolio.assets.find(
                                (asset) => asset.symbol === transaction.asset
                              )?.price ?? 0)
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">Date</span>
                        <span>
                          {formatDate(
                            transaction.metadata.blockTimestamp.toString()
                          )}
                        </span>
                      </div>
                      <Separator className="bg-primary/20" />

                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">Hash</span>
                        <Link
                          href={`https://etherscan.io/tx/${transaction.hash}`}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          <span className="text-primary hover:underline">
                            {formatAddress(transaction.hash ?? "")}
                          </span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                      <Separator className="bg-primary/20" />

                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">
                          Category
                        </span>
                        <span>{transaction.category}</span>
                      </div>
                      <Separator className="bg-primary/20" />

                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">Block</span>
                        <Link
                          href={`https://etherscan.io/block/${fromHex(
                            transaction.blockNum as `0x${string}`,
                            "bigint"
                          )}`}
                          target="_blank"
                        >
                          <span className="text-primary hover:underline">
                            {fromHex(
                              transaction.blockNum as `0x${string}`,
                              "bigint"
                            )}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
