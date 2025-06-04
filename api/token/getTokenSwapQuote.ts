"use server";

import axios from "axios";

export type SwapAsset = {
  address: string;
  amount?: number;
  symbol: string;
  image?: string;
  decimals?: number;
  name?: string;
  swapValue?: number;
};

export const getTokenSwapQuote = async (
  sendAsset: SwapAsset,
  receiveAsset: SwapAsset
) => {
  try {
    const d = await axios.get(`https://api.1inch.dev/swap/v6.0/1/quote`, {
      headers: {
        Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
      },
      params: {
        src: sendAsset?.address,
        dst: receiveAsset?.address,
        amount: (sendAsset?.swapValue ?? 0) * 10 ** (sendAsset?.decimals ?? 1),
        includeGas: true,
      },
    });
    return d.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
