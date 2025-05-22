"use client";

import { WagmiProvider, type State } from "wagmi";
import { getConfig } from "@/lib/configs/wagmi";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = (props: {
  children: React.ReactNode;
  initialState?: State;
}) => {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
