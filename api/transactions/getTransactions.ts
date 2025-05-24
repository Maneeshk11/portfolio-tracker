import alchemy from "@/lib/configs/alchemy";
import { AssetTransfersCategory } from "alchemy-sdk";

export const getTransactions = async (address: `0x${string}`) => {
  const transactionsTo = await alchemy.core.getAssetTransfers({
    toAddress: address,
    withMetadata: true,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
    ],
  });
  return transactionsTo;
};
