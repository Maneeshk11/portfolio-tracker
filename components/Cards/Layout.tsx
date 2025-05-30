"use client";

import AssetsCard from "./AssetsCard";
import FetchData from "./FetchData";
import TotalWorthCard from "./TotalworthCard";
import { PortfolioContextProvider } from "@/lib/contexts/usePortfolioState";
import TransactionsCard from "./TransactionsCard";
const Layout = () => {
  return (
    <div className="flex flex-col gap-4">
      <PortfolioContextProvider>
        <FetchData />
        <TotalWorthCard />
        <AssetsCard />
        <TransactionsCard />
      </PortfolioContextProvider>
    </div>
  );
};

export default Layout;
