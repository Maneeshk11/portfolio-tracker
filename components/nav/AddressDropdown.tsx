import { ChevronDownIcon, Copy, ExternalLink, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import formatAddress from "@/lib/address/utils";
import { useAccount, useDisconnect } from "wagmi";

const AddressDropdown = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-900 cursor-pointer"
        >
          {formatAddress(address?.toString() ?? "")}

          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(address?.toString() ?? "")
          }
          className="cursor-pointer flex items-center justify-between"
        >
          Copy Address
          <Copy className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            window.open(
              `https://etherscan.io/address/${address?.toString() ?? ""}`,
              "_blank"
            )
          }
          className="cursor-pointer flex items-center justify-between"
        >
          View on Explorer
          <ExternalLink className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="cursor-pointer flex items-center justify-between"
        >
          Disconnect
          <LogOut className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddressDropdown;
