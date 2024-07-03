import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../lib/auth";

async function getUserInfo() {
  const session = await getServerSession(authOptions);
  // if (!session?.user?.id) {
  //   return "Unauthenticated request";
  // }
  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.user?.id),
    },
    include: {
      Balance: true,
    },
  });
  return user;
}
const DashboardPage = async () => {
  const user = await getUserInfo();
  const amount = user?.Balance?.map((b) => b.amount);
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl md:text-3xl font-bold w-full">User Details</h2>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-semibold text-gray-900 text-sm">Name</dt>
            <dd className="text-gray-700 sm:col-span-2">{user?.name}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-semibold text-gray-900">Phone Number</dt>
            <dd className="text-gray-700 sm:col-span-2">{user?.number}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-semibold text-gray-900">Current Balance</dt>
            <dd className="text-gray-700 sm:col-span-2">{Number(amount)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default DashboardPage;
