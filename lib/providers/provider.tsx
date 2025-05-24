"use client";

import { WagmiProvider, type State } from "wagmi";
import { getConfig } from "@/lib/configs/wagmi";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { ThemeProvider } from "./theme-provider";

const Providers = (props: {
  children: React.ReactNode;
  initialState?: State;
}) => {
  const [config] = useState(() => getConfig());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {props.children}
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
