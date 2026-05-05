// app setup
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import expenseRoutes from "./routes/expense.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max requests per IP
    message: "Too many requests please try again later"
})

app.set("trust proxy", 1) // so Express knows its behind a proxy

// Helmet middleware
app.use(helmet())

// Rate limit
app.use(limiter)

// Cors middleware
app.use(cors());
app.use(express.json());

// Auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        status: 429,
        message: "Too many login attempts, please try again in 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

app.use("/auth", authLimiter, authRoutes)

// Expense routes
app.use("/expenses", expenseRoutes)

// Error middleware
app.use(errorHandler) // Always last

export default app

