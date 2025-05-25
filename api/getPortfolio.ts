import { Asset } from "@/lib/types";
import { getTokens } from "@/api/token/getTokens";
import { formatUnits } from "viem";
import { getBalance } from "wagmi/actions";
import { getConfig } from "@/lib/configs/wagmi";
import getTokenPrices from "@/api/token/getTokenPrices";
import { getTransactions } from "@/api/transactions/getTransactions";
import { Alchemy } from "alchemy-sdk";

const getPortfolio = async (
  address: `0x${string}`,
  chainId: number,
  alchemy: Alchemy | null
) => {
  if (!alchemy) {
    throw new Error("Alchemy is not initialized");
  }
  const assets: Asset[] = [];

  const nativeEth = await getBalance(getConfig(), {
    address,
    chainId: chainId as 1 | 11155111,
  });

  assets.push({
    address: "0x0000000000000000000000000000000000000000",
    name: "Ether",
    symbol: nativeEth.symbol,
    amount: formatUnits(nativeEth.value, nativeEth.decimals),
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  });

  const tokens = await getTokens(address, alchemy);
  assets.push(
    ...(tokens?.tokens.map((token) => ({
      address: token.contractAddress as `0x${string}`,
      name: token.name,
      symbol: token.symbol,
      amount: formatUnits(
        BigInt(token.rawBalance ?? 0),
        Number(token.decimals)
      ),
      image: token.logo,
    })) || [])
  );

  const prices = await getTokenPrices(assets.map((asset) => asset.symbol!));
  assets.forEach((asset) => {
    asset.price = prices[asset.symbol!.toLowerCase()];
    asset.total = {
      eth: 0,
      usd: asset.price * Number(asset.amount),
    };
  });

  const totalWorthUSD = assets.reduce((acc, asset) => {
    return acc + (asset.total?.usd ?? 0);
  }, 0);

  const totalWorthETH = 0;

  const totalWorth = {
    eth: totalWorthETH,
    usd: totalWorthUSD,
  };

  const transactions = await getTransactions(address, alchemy);

  return { assets, totalWorth, transactions };
};

export default getPortfolio;
