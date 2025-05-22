import { useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { Button } from "../ui/button";

const ConnectButton = () => {
  const { connect } = useConnect();

  return (
    <Button
      size="sm"
      className="cursor-pointer"
      onClick={() =>
        connect({
          connector: metaMask(),
        })
      }
    >
      Connect
    </Button>
  );
};

export default ConnectButton;
