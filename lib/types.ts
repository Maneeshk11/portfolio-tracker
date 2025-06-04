import { AssetTransfersWithMetadataResponse } from "alchemy-sdk";

export type Worth = {
  usd: number;
  eth: number;
};

export type Asset = {
  address: `0x${string}`;
  name?: string;
  symbol?: string;
  image?: string;
  amount?: string;
  price?: number;
  total?: Worth;
  decimals?: number;
};

export type Transaction = AssetTransfersWithMetadataResponse["transfers"][0];
