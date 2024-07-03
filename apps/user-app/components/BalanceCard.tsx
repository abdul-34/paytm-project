import { Card } from "@repo/ui/card";
import React from "react";

const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked balance</div>
        <div>{amount / 100} PKR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Total Locked balance</div>
        <div>{locked / 100} PKR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Total balance</div>
        <div>{locked + amount / 100} PKR</div>
      </div>
    </Card>
  );
};

export default BalanceCard;
