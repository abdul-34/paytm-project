import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  // if (!session?.user) {
  //   return "Unauthenticated request";
  // }
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    include: {
      toUser: true,
    },
  });
  return transactions;
}

const TransactionsPage = async () => {
  const transactions = await getP2PTransactions();
  if (!transactions?.length) {
    return <div className="p-4">No transactions found</div>;
  }
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Receiver Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Number
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Amount
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Time
            </th>
          </tr>
        </thead>
        {transactions?.map((t) => (
          <tbody className="divide-y divide-gray-200">
            <tr className="odd:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {t?.toUser.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {t?.toUser.number}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                ${t.amount}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {t.timestamp?.toString()}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default TransactionsPage;
