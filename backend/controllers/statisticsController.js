import Transaction from "../models/Transaction.js";


export const statistics = async (req, res) => {
  const { month } = req.query; 
  const parsedMonth = parseInt(month);

  if (!parsedMonth || parsedMonth < 1 || parsedMonth > 12) {
    return res.status(400).json({ error: "Invalid month provided" });
  }

  try {
    const selectedMonthTransactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$transaction_date" }, parsedMonth]
      }
    });

    const totalSaleAmount = selectedMonthTransactions.reduce(
      (total, transaction) => total + (transaction.sold ? transaction.price : 0),
      0
    );

    const totalSoldItems = selectedMonthTransactions.filter(
      (transaction) => transaction.sold
    ).length;

    const totalNotSoldItems = selectedMonthTransactions.filter(
      (transaction) => !transaction.sold
    ).length;

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
