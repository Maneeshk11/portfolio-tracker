import { Alchemy, Network } from "alchemy-sdk";

import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type alchemyContextType = {
  alchemy: Alchemy | null;
  chainId: number | undefined;
  setChainId: (chainId: number) => void;
};

const networks = {
  1: {
    name: "Ethereum",
    network: Network.ETH_MAINNET,
  },
  11155111: {
    name: "Sepolia",
    network: Network.ETH_SEPOLIA,
  },
};

const alchemyContext = createContext<alchemyContextType | undefined>(undefined);

export const useAlchemy = () => {
  const context = useContext(alchemyContext);
  if (!context) {
    throw new Error("useAlchemy must be used within a AlchemyProvider");
  }
  return context;
};

type AlchemyProviderProps = {
  children: React.ReactNode;
};

export const AlchemyProvider = ({ children }: AlchemyProviderProps) => {
  const { chainId: initialChainId } = useAccount();
  const [alchemy, setAlchemy] = useState<Alchemy | null>(null);
  const [chainId, setChainId] = useState(initialChainId);

  useEffect(() => {
    if (!chainId || !networks[chainId as keyof typeof networks]) return;

    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: networks[chainId as keyof typeof networks].network,
    };
    const alchemyNew = new Alchemy(config);
    setAlchemy(alchemyNew);
    console.log("alchemy: ", alchemyNew);
  }, [chainId]);

  return (
    <alchemyContext.Provider value={{ alchemy, chainId, setChainId }}>
      {children}
    </alchemyContext.Provider>
  );
};
