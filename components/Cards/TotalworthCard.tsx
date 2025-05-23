import { Bitcoin, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { usePortfolioContext } from "@/lib/contexts/usePortfolioState";
import { formatNumber } from "@/lib/utils";
const TotalWorthCard = () => {
  const { portfolio, setIsRefetching } = usePortfolioContext();

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
              ${formatNumber(portfolio.worth.usd)}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm">Worth (ETH)</span>
            <span className="text-2xl font-medium text-muted-foreground">
              {portfolio.worth.eth} ETH
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => setIsRefetching(true)}
        >
          <RefreshCw className="w-4 h-4" /> Sync
        </Button>
      </CardContent>
    </Card>
  );
};

export default TotalWorthCard;
