import axios from 'axios';
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose'; 
export const initializeDb = async (req, res) => {
  try {
    const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const transactions = response.data; 

    console.log(`Fetched ${transactions.length} transactions from API`);

    const formattedTransactions = transactions.map(transaction => ({
      product_id: transaction.id.toString(),
      title: transaction.title,
      description: transaction.description,
      price: transaction.price,
      quantity: transaction.quantity || 1, 
      category: transaction.category,
      transaction_date: new Date(transaction.dateOfSale), 
      sold: transaction.sold 
    })).filter(transaction => !isNaN(transaction.transaction_date)); 

    console.log(`Formatted ${formattedTransactions.length} valid transactions for insertion.`); 

    for (const transaction of formattedTransactions) {
      const existingTransaction = await Transaction.findOne({ product_id: transaction.product_id });
      if (!existingTransaction) {
        await Transaction.create(transaction);
        console.log(`Inserted transaction with product_id: ${transaction.product_id}`);
      } else {
        console.log(`Transaction with product_id ${transaction.product_id} already exists.`);
      }
    }

    console.log('Data saved successfully!');

    res.json({ message: "Database initialized successfully", count: formattedTransactions.length });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    mongoose.connection.close();
  }
};

