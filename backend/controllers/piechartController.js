import Transaction from "../models/Transaction.js";

export const pieChart = async (req, res) => {
  const { month } = req.query;
  const parsedMonth = parseInt(month, 10);

  try {
    const selectedMonthTransactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$transaction_date" }, parsedMonth],
      },
    });

    const categoryCountMap = {};

    selectedMonthTransactions.forEach((transaction) => {
      const category = transaction.category;

      if (!categoryCountMap[category]) {
        categoryCountMap[category] = 0;
      }

      categoryCountMap[category]++;
    });

    const pieChartData = Object.keys(categoryCountMap).map((category) => ({
      category,
      count: categoryCountMap[category],
    }));

    res.json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
