// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from 'cookie-parser';


// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.get('/',"hello world")

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Enable cookies
  })
);
app.use(express.json());
app.use(cookieParser());  

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes); 

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
