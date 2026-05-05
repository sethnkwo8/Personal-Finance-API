// Expense controller
import { AuthRequest } from "../types/express.js";
import { Response, NextFunction } from "express";
import { createExpense, getExpenses, deleteExpense } from "../services/expense.service.js";
import { AppError } from "../utils/AppError.js";
import { expenseQuerySchema } from "../validators/expense.query.validator.js";

// Create expense controller
export async function create(req: AuthRequest, res: Response, next: NextFunction) {
    const {title, amount, category} = req.body;

    try{
        if (!req.user) {
            throw new AppError("Unauthorized", 401)
        }

        const expense = await createExpense(title, amount, category, req.user.userId)

        res.status(201).json(expense)
    } catch(err) {
        next(err)
    }
}

// Get expense controller
export async function get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            throw new AppError("Unauthorized", 401)
        }

        const parsed = expenseQuerySchema.parse(req.query)

        const {
            page, 
            limit, 
            category,
            minAmount,
            maxAmount,
            startDate,
            endDate
        } = parsed;

        const results = await getExpenses(
            req.user.userId,
            page,
            limit,
            {
                category,
                minAmount,
                maxAmount,
                startDate,
                endDate
            }
        )

        res.status(200).json(results)
    } catch(err) {
        next(err)
    }
}

// Delete expense controller
export async function remove(req: AuthRequest, res: Response, next: NextFunction) {
    const {id} = req.params;

    try{
        if (typeof id !== "string") {
            throw new AppError("Invalid ID format", 400)
        }

        if (!req.user) {
            throw new AppError("Unauthorized", 401)
        }

        const result = await deleteExpense(id, req.user.userId)

        res.status(200).json(result)
    } catch(err) {
        next(err)
    }
}