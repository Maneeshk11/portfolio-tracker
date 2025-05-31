import { createStore } from "zustand/vanilla";
import { Transaction, Worth, Asset } from "../types";

export type PortfolioState = {
  worth: Worth;
  assets: Asset[];
  transactions: Transaction[];
  isRefetching: boolean;
};

export type PortfolioActions = {
  //   setPortfolio: (portfolio: PortfolioState) => void;
  setWorth: (worth: Worth) => void;
  setAssets: (assets: Asset[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setIsRefetching: (isRefetching: boolean) => void;
};

export type PortfolioStore = PortfolioState & PortfolioActions;

export const defaultInitState: PortfolioState = {
  worth: { usd: 0, eth: 0 },
  assets: [],
  transactions: [],
  isRefetching: false,
};

export const createPortfolioStore = (
  initState: PortfolioState = defaultInitState
) => {
  return createStore<PortfolioStore>()((set) => ({
    ...initState,
    setWorth: (worth: Worth) => set({ worth }),
    setAssets: (assets: Asset[]) => set({ assets }),
    setTransactions: (transactions: Transaction[]) => set({ transactions }),
    setIsRefetching: (isRefetching: boolean) => set({ isRefetching }),
  }));
};
