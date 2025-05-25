import { Alchemy } from "alchemy-sdk";

export const getTokens = async (address: `0x${string}`, alchemy: Alchemy) => {
  const tokens = await alchemy.core.getTokensForOwner(address as `0x${string}`);
  return tokens;
};
