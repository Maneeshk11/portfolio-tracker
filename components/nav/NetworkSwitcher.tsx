import { useAlchemy } from "@/lib/providers/alchemy";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { useSwitchChain } from "wagmi";
import { Button } from "../ui/button";
import { Repeat2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface NetworkSwitcherProps {
  chainId: number;
}

const NetworkSwitcher = ({ chainId }: NetworkSwitcherProps) => {
  const { switchChain, chains } = useSwitchChain();
  const { setChainId } = useAlchemy();
  const [value, setValue] = useState(chainId.toString());
  const [open, setOpen] = useState(false);

  const blockCloseRef = useRef(false);

  useEffect(() => {
    setValue(chainId.toString());
  }, [chainId]);

  const chainSwitch = (newChain: number) => {
    setOpen(false);

    if (newChain === chainId) return;
    setChainId(newChain);
    switchChain({ chainId: newChain as 1 | 11155111 });
    setValue(newChain.toString());
  };

  const handleValueChange = (newValue: string) => {
    blockCloseRef.current = newValue !== chainId.toString();
    setValue(newValue);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && blockCloseRef.current) {
      blockCloseRef.current = false;
      setOpen(true);
    } else {
      blockCloseRef.current = false;
      setValue(chainId.toString());
      setOpen(nextOpen);
    }
  };

  return (
    <Select
      name="network"
      value={value}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={handleOpenChange}
      defaultValue={chainId.toString()}
    >
      <SelectTrigger
        size="sm"
        className="text-gray-900 w-32 cursor-pointer border border-primary rounded-md px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm shadow-primary/20 transition-colors"
      >
        <SelectValue placeholder="Select a network" />
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => (
          <SelectItem key={chain.id} value={chain.id.toString()}>
            {chain.name}
          </SelectItem>
        ))}

        <div className="flex items-center gap-2 justify-center m-2">
          <Button
            variant="default"
            size="sm"
            disabled={value === chainId.toString()}
            onClick={() => chainSwitch(Number(value))}
            className="w-full text-xs font-medium cursor-pointer"
          >
            <Repeat2 className="w-4 h-4" />
            Change
          </Button>
        </div>
      </SelectContent>
    </Select>
  );
};

export default NetworkSwitcher;
