import { Bitcoin, Coins, DollarSign, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { formatNumber } from "@/lib/utils";
import { useAccount } from "wagmi";
import { usePortfolioStore } from "@/lib/providers/portfolio-store-provider";
const TotalWorthCard = () => {
  const { worth, setIsRefetching, isRefetching } = usePortfolioStore(
    (state) => state
  );
  const { address } = useAccount();

  // Format currency with proper formatting
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Bitcoin className="w-4 h-4" /> Total Worth
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex gap-8">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> Worth (USD)
            </span>
            <span className="text-3xl font-medium">
              ${formatCurrency(worth.usd)}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Coins className="w-4 h-4" /> Worth (ETH)
            </span>
            <span className="text-3xl font-medium">
              {formatNumber(worth.eth)} ETH
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            setIsRefetching(true);
          }}
          disabled={isRefetching || !address}
        >
          <RefreshCw className={`w-4 h-4 ${isRefetching && "animate-spin"}`} />
          {isRefetching ? "Syncing" : "Sync"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TotalWorthCard;
