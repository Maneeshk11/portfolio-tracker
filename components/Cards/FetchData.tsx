import getPortfolio from "@/hooks/useGetPortfolio";
import { usePortfolioContext } from "@/lib/contexts/usePortfolioState";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAccount } from "wagmi";
const FetchData = () => {
  const { address } = useAccount();
  const { setPortfolio } = usePortfolioContext();

  const { data: portfolio } = useQuery({
    queryKey: ["portfolio", address],
    queryFn: () => getPortfolio(address as `0x${string}`),
    enabled: !!address,
  });

  useEffect(() => {
    if (portfolio) {
      setPortfolio({
        worth: { eth: portfolio.totalWorth.eth, usd: portfolio.totalWorth.usd },
        assets: portfolio.assets,
      });
    }
  }, [portfolio]);
  return null;
};

export default FetchData;
