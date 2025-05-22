"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import ConnectButton from "./ConnectButton";
import AddressDropdown from "./AddressDropdown";

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
      {isConnected ? <AddressDropdown /> : <ConnectButton />}
    </nav>
  );
};

export default Nav;
