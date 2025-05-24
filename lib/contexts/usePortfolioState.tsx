import { useState } from "react";
import { createContext, useContext } from "react";
import { Asset, Worth, Transaction } from "../types";

type PortfolioState = {
  worth: Worth;
  assets: Asset[];
  transactions: Transaction[];
};

interface PortfolioContextType {
  portfolio: PortfolioState;
  setPortfolio: (portfolio: PortfolioState) => void;
  isRefetching: boolean;
  setIsRefetching: (isRefetching: boolean) => void;
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
    transactions: [],
  });
  const [isRefetching, setIsRefetching] = useState(false);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio,
        isRefetching,
        setIsRefetching,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
