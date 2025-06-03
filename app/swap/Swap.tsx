"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SwapForm from "./Form";

const Swap = () => {
  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <SwapForm />
      </CardContent>
    </Card>
  );
};

export default Swap;
