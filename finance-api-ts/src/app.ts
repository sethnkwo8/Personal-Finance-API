// app setup
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import expenseRoutes from "./routes/expense.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app = express()

app.use(cors());

app.use(express.json());

// Error middleware
app.use(errorHandler)

// Auth routes
app.use("/auth", authRoutes)

// Expense routes
app.use("/expenses", expenseRoutes)

export default app

