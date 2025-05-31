import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePortfolioContext } from "@/lib/contexts/usePortfolioState";

const Swap = () => {
  const { portfolio } = usePortfolioContext();

  console.log(portfolio);

  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border rounded p-4 shadow-2xl shadow-primary/50 dark:shadow-primary/50">
          <span className="text-sm font-medium">Send</span>
          <div className="flex gap-2 items-center">
            <Input
              className="shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl "
              placeholder="0"
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {portfolio.assets.map((asset) => (
                  <SelectItem key={asset.address} value={asset.address}>
                    {asset.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 border rounded p-4  shadow-2xl shadow-primary/50 dark:shadow-primary/50">
          <span className="text-sm">Receive</span>
          <div className="flex gap-2 items-center">
            <Input
              className="shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl"
              placeholder="0"
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-24  cursor-pointer">Swap</Button>
      </CardFooter>
    </Card>
  );
};

export default Swap;
