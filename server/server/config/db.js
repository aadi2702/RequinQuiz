import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connected to Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("Error connecting to DB", error);
  }
};

export default connectDB;
