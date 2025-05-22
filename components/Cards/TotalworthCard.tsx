import { Bitcoin, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import useTokenPrice from "@/hooks/tokens/useTokenPrice";

const TotalWorthCard = () => {
  const { address } = useAccount();
  const { data: ethData } = useBalance({
    address: address as `0x${string}`,
  });

  const { data: usdData } = useTokenPrice("ethereum");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Bitcoin className="w-4 h-4" /> Total Worth
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex gap-6">
          <div className="flex flex-col space-y-1">
            <span className="text-sm ">Worth (USD)</span>
            <span className="text-2xl font-medium text-muted-foreground">
              {usdData} USD
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm">Worth (ETH)</span>
            <span className="text-2xl font-medium text-muted-foreground">
              {parseFloat(
                formatUnits(
                  ethData?.value ?? BigInt(0),
                  ethData?.decimals ?? 18
                )
              ).toFixed(5)}{" "}
              {ethData?.symbol}
            </span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="cursor-pointer">
          <RefreshCw className="w-4 h-4" /> Sync
        </Button>
      </CardContent>
    </Card>
  );
};

export default TotalWorthCard;
