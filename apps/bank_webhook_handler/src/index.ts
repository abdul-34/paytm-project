import db from "@repo/db/client";
import express from "express";

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await db.user.findMany({
      include: {
        OnRampTransaction: true,
      },
    });
    return res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/bankWebhook", async (req, res) => {
  const { token, user_identifier: userId, amount } = req.body;

  try {
    const transactionResults = await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(userId),
        },
        data: {
          amount: {
            increment: Number(amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    // console.log("Transaction results:", transactionResults);

    res.json({
      message: "Balance is updated successfully",
    });
  } catch (error) {
    console.error("Error during transaction:", error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003, () => {
  console.log(`Server is running on PORT:3003`);
});
