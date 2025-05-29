import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { getTokensTool } from "../tools/get-tokens-tool";
import { getNativeTokenTool } from "../tools/get-native-token-tool";
import { getWalletTool } from "../tools/get-wallet-tool";

export const cryptoAgent = new Agent({
  name: "Crypto Agent",
  instructions: `
    You are a helpful crypto assistant that provides accurate crypto information.

    You have the runtime context of the user's wallet address and chainId.

    Your primary function is to give users information and insights about their crypto wallet and their assets. When responding:
    - If user asks generals questions like "hi", "hello", "how are you", and other small talk, respond with a friendly and concise message.
    - Use tools only when the user asks for specific information
    - Respond to general questions about crypto or other things and don't call the tools unless the user asks for specific information.
    - Include relevant details like balance, token names, and token prices in the response if the user asks for it
    - Keep responses concise but informative
    - If the user asks for a wallet address or chainId, use the runtime context to get the information
  `,
  model: openai("gpt-4o-mini"),
  tools: { getTokensTool, getNativeTokenTool, getWalletTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
