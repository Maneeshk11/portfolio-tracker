"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import {
  createPortfolioStore,
  PortfolioStore,
} from "../stores/portfolio-store";
import { useStore } from "zustand";

export type PortfolioStoreApi = ReturnType<typeof createPortfolioStore>;

export const PortfolioStoreContext = createContext<
  PortfolioStoreApi | undefined
>(undefined);

export interface PortfolioStoreProviderProps {
  children: ReactNode;
}

export const PortfolioStoreProvider = ({
  children,
}: PortfolioStoreProviderProps) => {
  const storeRef = useRef<PortfolioStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createPortfolioStore();
  }

  return (
    <PortfolioStoreContext.Provider value={storeRef.current}>
      {children}
    </PortfolioStoreContext.Provider>
  );
};

export const usePortfolioStore = <T,>(
  selector: (store: PortfolioStore) => T
): T => {
  const counterStoreContext = useContext(PortfolioStoreContext);

  if (!counterStoreContext) {
    throw new Error(
      "usePortfolioStore must be used within a PortfolioStoreProvider"
    );
  }

  return useStore(counterStoreContext, selector);
};
