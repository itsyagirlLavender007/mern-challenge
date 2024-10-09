import mongoose from "mongoose";

export const useDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/TTT')
.then(() => console.log('MongoDB connected succesfully'))
.catch((err) => console.error('MongoDB connection error:', err));};