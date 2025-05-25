import getPortfolio from "@/api/getPortfolio";
import { usePortfolioContext } from "@/lib/contexts/usePortfolioState";
import { useAlchemy } from "@/lib/providers/alchemy";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAccount } from "wagmi";
const FetchData = () => {
  const { address, chainId } = useAccount();
  const { setPortfolio, isRefetching, setIsRefetching } = usePortfolioContext();
  const { alchemy } = useAlchemy();
  const { data: portfolio, refetch } = useQuery({
    queryKey: ["portfolio", address],
    queryFn: () =>
      getPortfolio(address as `0x${string}`, Number(chainId), alchemy),
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
