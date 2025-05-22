import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTokenPrice = async (currencyId: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${currencyId}&vs_currencies=usd`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  console.log(data);
  return data[currencyId].usd;
};

const useTokenPrice = (currencyId: string) => {
  return useQuery<number, Error>({
    queryKey: ["tokenPrice", currencyId],
    queryFn: async () => fetchTokenPrice(currencyId),
    enabled: !!currencyId,
  });
};

export default useTokenPrice;
