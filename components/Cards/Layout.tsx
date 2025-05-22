"use client";

import AssetsCard from "./AssetsCard";
import TotalWorthCard from "./TotalworthCard";

const Layout = () => {
  return (
    <main className="flex flex-col gap-4">
      <TotalWorthCard />
      <AssetsCard />
    </main>
  );
};

export default Layout;
