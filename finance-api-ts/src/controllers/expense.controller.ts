// Expense controller
import { AuthRequest } from "../types/express.js";
import { Response, NextFunction } from "express";
import { createExpense, getExpenses, deleteExpense } from "../services/expense.service.js";

// Create expense controller
export async function create(req: AuthRequest, res: Response, next: NextFunction) {
    const {title, amount, category} = req.body;

    try{
        const expense = await createExpense(title, amount, category, req.user!.userId)

        res.status(201).json(expense)
    } catch(err) {
        next(err)
    }
}