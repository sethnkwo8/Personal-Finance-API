// Expense controller
import { AuthRequest } from "../types/express.js";
import { Response, NextFunction } from "express";
import { createExpense, getExpenses, deleteExpense } from "../services/expense.service.js";
import { AppError } from "../utils/AppError.js";

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

        const {
            page = "1", 
            limit = "10", 
            category,
            minAmount,
            maxAmount,
            startDate,
            endDate
        } = req.query;

        const results = await getExpenses(
            req.user.userId,
            Number(page),
            Number(limit),
            {
                category: category as string,
                minAmount: minAmount ? Number(minAmount) : undefined,
                maxAmount: maxAmount ? Number(maxAmount) : undefined,
                startDate: startDate as string,
                endDate: endDate as string
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