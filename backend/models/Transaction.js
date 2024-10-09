import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  product_id: String,
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String,
  transaction_date: Date, 
  sold: Boolean, 
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;