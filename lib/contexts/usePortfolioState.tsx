import { useState } from "react";
import { createContext, useContext } from "react";
import { Asset, Worth } from "../types";
import getPortfolio from "@/hooks/useGetPortfolio";

type PortfolioState = {
  worth: Worth;
  assets: Asset[];
};

interface PortfolioContextType {
  portfolio: PortfolioState;
  setPortfolio: (portfolio: PortfolioState) => void;
  refetchPortfolio: (address: `0x${string}`) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(
      "usePortfolioContext must be used within a PortfolioProvider"
    );
  }
  return context;
};

interface PortfolioContextProviderProps {
  children: React.ReactNode;
}

export const PortfolioContextProvider = ({
  children,
}: PortfolioContextProviderProps) => {
  const [portfolio, setPortfolio] = useState<PortfolioState>({
    worth: { usd: 0, eth: 0 },
    assets: [],
  });

  const refetchPortfolio = async (address: `0x${string}`) => {
    if (!address) return;
    console.log("refetching portfolio");
    const portfolio = await getPortfolio(address as `0x${string}`);
    setPortfolio({
      worth: { eth: portfolio.totalWorth.eth, usd: portfolio.totalWorth.usd },
      assets: portfolio.assets,
    });
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, setPortfolio, refetchPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
