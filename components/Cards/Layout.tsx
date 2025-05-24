"use client";

import AssetsCard from "./AssetsCard";
import FetchData from "./FetchData";
import TotalWorthCard from "./TotalworthCard";
import { PortfolioContextProvider } from "@/lib/contexts/usePortfolioState";
import TransactionsCard from "./TransactionsCard";
const Layout = () => {
  return (
    <main className="flex flex-col gap-4">
      <PortfolioContextProvider>
        <FetchData />
        <TotalWorthCard />
        <AssetsCard />
        <TransactionsCard />
      </PortfolioContextProvider>
    </main>
  );
};

export default Layout;
