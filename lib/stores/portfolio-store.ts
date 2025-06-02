import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

import { Transaction, Worth, Asset } from "../types";
import { queryClient } from "../queryClient";
import getPortfolio from "@/api/getPortfolio";

export type PortfolioState = {
  worth: Worth;
  assets: Asset[];
  transactions: Transaction[];
  isRefetching: boolean;
};

export type PortfolioActions = {
  setWorth: (worth: Worth) => void;
  setAssets: (assets: Asset[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setIsRefetching: (isRefetching: boolean) => void;
  refetch: (address: `0x${string}`, chainId: number) => Promise<void>;
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
  return createStore<PortfolioStore>()(
    persist(
      (set) => ({
        ...initState,
        setWorth: (worth: Worth) => set({ worth }),
        setAssets: (assets: Asset[]) => set({ assets }),
        setTransactions: (transactions: Transaction[]) => set({ transactions }),
        setIsRefetching: (isRefetching: boolean) => set({ isRefetching }),
        refetch: async (address: `0x${string}`, chainId: number) => {
          const data = await queryClient.fetchQuery({
            queryKey: ["portfolio", address],
            queryFn: () =>
              getPortfolio(address as `0x${string}`, Number(chainId)),
          });
          if (!data) return;
          set({
            worth: data.totalWorth,
            assets: data.assets,
            transactions: data.transactions,
          });
        },
      }),
      {
        name: "portfolio",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
