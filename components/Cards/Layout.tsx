// not using this component anymore

"use client";

import AssetsCard from "./AssetsCard";
import TotalWorthCard from "./TotalworthCard";
import TransactionsCard from "./TransactionsCard";
const Layout = () => {
  return (
    <div className="flex flex-col gap-4">
      <TotalWorthCard />
      <AssetsCard />
      <TransactionsCard />
    </div>
  );
};

export default Layout;
