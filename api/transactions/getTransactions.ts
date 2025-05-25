import { Alchemy } from "alchemy-sdk";
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk";

export const getTransactions = async (
  address: `0x${string}`,
  alchemy: Alchemy
) => {
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
    order: SortingOrder.DESCENDING,
  });

  const transactionsFrom = await alchemy.core.getAssetTransfers({
    fromAddress: address,
    withMetadata: true,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
    ],
    order: SortingOrder.DESCENDING,
  });

  return [...transactionsTo.transfers, ...transactionsFrom.transfers].sort(
    (a, b) =>
      new Date(b.metadata.blockTimestamp).getTime() -
      new Date(a.metadata.blockTimestamp).getTime()
  );
};
