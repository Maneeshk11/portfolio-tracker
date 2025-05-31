import getPortfolio from "@/api/getPortfolio";
import { useAlchemy } from "@/lib/providers/alchemy";
import { usePortfolioStore } from "@/lib/providers/portfolio-store-provider";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAccount } from "wagmi";
const FetchData = () => {
  const { address, chainId } = useAccount();
  const {
    setAssets,
    setTransactions,
    setWorth,
    setIsRefetching,
    isRefetching,
  } = usePortfolioStore((state) => state);
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
      setWorth({
        eth: portfolio.totalWorth.eth,
        usd: portfolio.totalWorth.usd,
      });
      setAssets(portfolio.assets);
      setTransactions(portfolio.transactions);
    }
  }, [isRefetching, portfolio]);

  return null;
};

export default FetchData;
