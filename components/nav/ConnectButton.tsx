import { metaMask } from "wagmi/connectors";
import { Button } from "../ui/button";
import getPortfolio from "@/api/getPortfolio";
import { usePortfolioStore } from "@/lib/providers/portfolio-store-provider";
import { connect } from "wagmi/actions";
import { getConfig } from "@/lib/configs/wagmi";
import { queryClient } from "@/lib/queryClient";

const ConnectButton = () => {
  const { setAssets, setTransactions, setWorth } = usePortfolioStore(
    (state) => state
  );

  async function HandleConnect() {
    const result = await connect(getConfig(), { connector: metaMask() });

    if (!result.accounts[0]) return;
    if (!result.chainId) return;

    // Invalidate existing cache to force fresh data
    await queryClient.invalidateQueries({
      queryKey: ["portfolio", result.accounts[0]],
    });

    const data = await queryClient.fetchQuery({
      queryKey: ["portfolio", result.accounts[0]],
      queryFn: () =>
        getPortfolio(
          result.accounts[0] as `0x${string}`,
          Number(result.chainId)
        ),
    });

    if (!data) return;

    setWorth({
      eth: data.totalWorth.eth,
      usd: data.totalWorth.usd,
    });
    setAssets(data.assets);
    setTransactions(data.transactions);
  }

  return (
    <Button size="sm" className="cursor-pointer" onClick={HandleConnect}>
      Connect
    </Button>
  );
};

export default ConnectButton;
