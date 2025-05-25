import { useAlchemy } from "@/lib/providers/alchemy";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { useSwitchChain } from "wagmi";
interface NetworkSwitcherProps {
  chainId: number;
}

const NetworkSwitcher = ({ chainId }: NetworkSwitcherProps) => {
  const { switchChain, chains } = useSwitchChain();
  const { setChainId } = useAlchemy();
  const chainSwitch = (chain: number) => {
    if (chain === chainId) {
      return;
    }
    setChainId(chain);
    switchChain({ chainId: chain as 1 | 11155111 });
  };

  return (
    <Select
      defaultValue={chainId.toString()}
      name="network"
      onValueChange={(value) => chainSwitch(Number(value))}
    >
      <SelectTrigger
        size="sm"
        className="text-gray-900 cursor-pointer border border-primary rounded-md px-4 py-2 font-medium  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm shadow-primary/20 transition-colors"
      >
        <SelectValue placeholder="Select a network" />
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => (
          <SelectItem key={chain.id} value={chain.id.toString()}>
            {chain.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default NetworkSwitcher;
