import Transaction from "../models/Transaction.js";

export const transactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, month = "" } = req.query;

    const startDate = new Date("2021-01-01T00:00:00Z");
    const endDate = new Date("2023-01-01T00:00:00Z"); 

    const query = {
      transaction_date: {
        $gte: startDate,
        $lt: endDate,
      },
    };

    if (month) {
      const monthStart = new Date(`2021-${month}-01T00:00:00Z`);
      const monthEnd = new Date(`2021-${month}-01T00:00:00Z`);
      monthEnd.setMonth(monthEnd.getMonth() + 1); 

      const month2022Start = new Date(`2022-${month}-01T00:00:00Z`);
      const month2022End = new Date(`2022-${month}-01T00:00:00Z`);
      month2022End.setMonth(month2022End.getMonth() + 1); 

      query.$or = [
        {
          transaction_date: {
            $gte: monthStart,
            $lt: monthEnd,
          },
        },
        {
          transaction_date: {
            $gte: month2022Start,
            $lt: month2022End,
          },
        },
      ];
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
