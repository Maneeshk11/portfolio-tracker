"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import ConnectButton from "./ConnectButton";
import AddressDropdown from "./AddressDropdown";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="flex justify-between items-center">
      <Link
        href="/"
        className="text-xl font-medium font-mono text-secondary-foreground"
      >
        Portfolio Tracker
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isConnected ? <AddressDropdown /> : <ConnectButton />}
      </div>
    </nav>
  );
};

export default Nav;
