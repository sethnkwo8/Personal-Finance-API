// app setup
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import expenseRoutes from "./routes/expense.routes.js"

const app = express()

app.use(cors());

app.use(express.json());

// Auth routes
app.use("/auth", authRoutes)

// Expense routes
app.use("/expenses", expenseRoutes)

export default app

