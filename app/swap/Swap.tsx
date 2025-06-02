"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/lib/providers/portfolio-store-provider";
import Image from "next/image";
import { useState } from "react";
import { Wallet } from "lucide-react";

export type SwapAsset = {
  address: string;
  amount?: number;
  symbol: string;
  image?: string;
  decimals?: number;
  name?: string;
  swapValue?: number;
};

const Swap = () => {
  const { assets } = usePortfolioStore((state) => state);

  const [sendAsset, setSendAsset] = useState<SwapAsset | null>(null);
  const [receiveAsset, setReceiveAsset] = useState<SwapAsset | null>(null);
  const [invalidSwap, setInvalidSwap] = useState(false);

  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border rounded p-4 shadow-2xl shadow-primary/50 dark:shadow-primary/50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Send</span>
            {sendAsset && (
              <span className="text-sm font-medium flex items-center gap-2 text-gray-500">
                <Wallet className="w-4 h-4" />
                {sendAsset?.amount}
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Input
              className={`${
                invalidSwap ? "text-primary" : "text-gray-500"
              } shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              placeholder="0"
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) > (sendAsset?.amount ?? 0)) {
                  setInvalidSwap(true);
                } else {
                  setInvalidSwap(false);
                }
              }}
            />
            <Select
              value={sendAsset?.address ?? ""}
              onValueChange={(value) => {
                const asset = assets.find((asset) => asset.address === value);
                setSendAsset({
                  address: asset?.address ?? "",
                  symbol: asset?.symbol ?? "",
                  amount: Number(asset?.amount),
                });
              }}
            >
              <SelectTrigger className="w-40 bg-transparent dark:bg-transparent rounded-full">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem
                    key={asset.address}
                    value={asset.address}
                    className="flex items-center gap-2"
                  >
                    {asset.image && (
                      <Image
                        src={asset.image ?? ""}
                        alt={asset.symbol ?? ""}
                        width={20}
                        height={20}
                      />
                    )}
                    <span>{asset.symbol}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 border rounded p-4  shadow-2xl shadow-primary/50 dark:shadow-primary/50">
          <span className="text-sm font-medium">Receive</span>
          <div className="flex gap-2 items-center">
            <Input
              className="shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              type="number"
            />
            <Select
              value={receiveAsset?.address ?? ""}
              onValueChange={(value) => {
                const asset = assets.find((asset) => asset.address === value);
                setReceiveAsset({
                  address: asset?.address ?? "",
                  symbol: asset?.symbol ?? "",
                  amount: Number(asset?.amount),
                });
              }}
            >
              <SelectTrigger className="w-40 bg-transparent dark:bg-transparent rounded-full">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem
                    key={asset.address}
                    value={asset.address}
                    className="flex items-center gap-2"
                  >
                    {asset.image && (
                      <Image
                        src={asset.image ?? ""}
                        alt={asset.symbol ?? ""}
                        width={20}
                        height={20}
                      />
                    )}
                    <span className="font-medium">{asset.symbol}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-24  cursor-pointer" disabled={true}>
          Swap
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Swap;
