"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // CHECK USER IS AUTHENTICATED OR NOT
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  // GENERATE TOKEN
  const token = (Math.random() * 1000).toString();
  // CREATE ON RAMP TRANSACTION
  await prisma.onRampTransaction.create({
    data: {
      provider,
      startTime: new Date(),
      token,
      userId: Number(session?.user?.id),
      amount: amount * 100,
      status: "Processing",
    },
  });
  return {
    message: "onRampTransaction created successfully",
  };
}
