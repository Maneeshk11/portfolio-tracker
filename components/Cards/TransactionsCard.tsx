import { Card, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeftRight } from "lucide-react";
const TransactionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <ArrowLeftRight className="w-4 h-4" />
          <span>Transactions</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TransactionsCard;
