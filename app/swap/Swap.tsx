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

const Swap = () => {
  const { assets } = usePortfolioStore((state) => state);

  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border rounded p-4 shadow-2xl shadow-primary/50 dark:shadow-primary/50">
          <span className="text-sm font-medium">Send</span>
          <div className="flex gap-2 items-center">
            <Input
              className="shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl "
              placeholder="0"
            />
            <Select>
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
              className="shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl"
              placeholder="0"
            />
            <Select>
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
