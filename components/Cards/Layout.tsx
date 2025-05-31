"use client";

import AssetsCard from "./AssetsCard";
import FetchData from "./FetchData";
import TotalWorthCard from "./TotalworthCard";
import TransactionsCard from "./TransactionsCard";
const Layout = () => {
  return (
    <div className="flex flex-col gap-4">
      <FetchData />
      <TotalWorthCard />
      <AssetsCard />
      <TransactionsCard />
    </div>
  );
};

export default Layout;
