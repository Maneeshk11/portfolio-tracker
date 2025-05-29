import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";

import { weatherAgent } from "./agents/weather-agent";
import { cryptoAgent } from "./agents/crypto-agent";

export const mastra = new Mastra({
  agents: { weatherAgent, cryptoAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  server: {
    middleware: [
      async (c, next) => {
        const { address, chainId } = await c.req.json();
        const runtimeContext = c.get("runtimeContext");
        if (!runtimeContext) {
          throw new Error("Runtime context not found");
        }

        runtimeContext.set("address", address);
        runtimeContext.set("chainId", chainId);
        await next();
      },
    ],
  },
});
