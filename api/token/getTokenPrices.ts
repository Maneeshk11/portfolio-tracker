import axios from "axios";

const getTokenPrices = async (currencyIds: string[]) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?symbols=${currencyIds.join(
      ","
    )}&vs_currencies=usd`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;

  // Return an object mapping each currency ID to its price
  const priceMap: Record<string, number> = {};

  Object.keys(data).forEach((key) => {
    priceMap[key] = data[key].usd;
  });

  return priceMap;
};

export default getTokenPrices;
