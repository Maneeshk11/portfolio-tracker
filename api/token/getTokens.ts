import alchemy from "@/lib/configs/alchemy";

export const getTokens = async (address: `0x${string}`) => {
  const tokens = await alchemy.core.getTokensForOwner(address as `0x${string}`);
  return tokens;
};
