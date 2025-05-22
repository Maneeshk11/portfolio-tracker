import { Copy } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";

const AddressCard = () => {
  const { address } = useAccount();

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // Optionally, add some user feedback here (e.g., a toast notification)
      console.log("Address copied to clipboard!");
    }
  };

  return (
    <Card className="flex flex-col gap-2">
      <CardContent className="flex items-center gap-4">
        <code className="font-mono">{address}</code>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          aria-label="Copy address"
          className="cursor-pointer"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
