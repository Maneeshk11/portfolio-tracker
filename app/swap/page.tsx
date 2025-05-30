"use client";

import { PortfolioContextProvider } from "@/lib/contexts/usePortfolioState";
import Swap from "./Swap";

const SwapPage = () => {
  return (
    <PortfolioContextProvider>
      <div className="flex justify-center items-center h-screen">
        <Swap />
      </div>
    </PortfolioContextProvider>
  );
};

export default SwapPage;
