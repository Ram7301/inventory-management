import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expensesByCategoryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });

    const expenseByCategorySummary = expensesByCategoryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.status(200).json(expenseByCategorySummary);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retriveving expenses by category summary" });
  }
};
