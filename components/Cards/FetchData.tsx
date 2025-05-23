import getPortfolio from "@/hooks/useGetPortfolio";
import { usePortfolioContext } from "@/lib/contexts/usePortfolioState";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAccount } from "wagmi";
const FetchData = () => {
  const { address } = useAccount();
  const { setPortfolio, isRefetching, setIsRefetching } = usePortfolioContext();

  const { data: portfolio, refetch } = useQuery({
    queryKey: ["portfolio", address],
    queryFn: () => getPortfolio(address as `0x${string}`),
    enabled: !!address,
  });

  useEffect(() => {
    if (isRefetching) {
      setTimeout(() => {
        refetch();
        setIsRefetching(false);
      }, 1000);
    }
    if (portfolio) {
      setPortfolio({
        worth: { eth: portfolio.totalWorth.eth, usd: portfolio.totalWorth.usd },
        assets: portfolio.assets,
        transactions: portfolio.transactions,
      });
    }
  }, [isRefetching, portfolio]);

  return null;
};

export default FetchData;
