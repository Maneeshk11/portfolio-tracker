import { Currency } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead } from "../ui/table";

const AssetsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Currency className="w-4 h-4" /> Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssetsCard;
