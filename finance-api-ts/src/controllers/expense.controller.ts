// Expense controller
import { AuthRequest } from "../types/express.js";
import { Response, NextFunction } from "express";
import { createExpense, getExpenses, deleteExpense } from "../services/expense.service.js";

// Create expense controller
export async function create(req: AuthRequest, res: Response, next: NextFunction) {
    const {title, amount, category} = req.body;

    try{
        if (!req.user) {
            return res.status(401).json({message: "Unauthorized"})
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
            return res.status(401).json({message: "Unauthorized"})
        }

        const expenses = await getExpenses(req.user.userId)

        res.status(200).json(expenses)
    } catch(err) {
        next(err)
    }
}

// Delete expense controller
export async function remove(req: AuthRequest, res: Response, next: NextFunction) {
    const {id} = req.params;

    try{
        if (typeof id !== "string") {
            return res.status(400).json({message: "Invalid ID format"})
        }

        if (!req.user) {
            return res.status(401).json("Unauthorized")
        }

        const result = await deleteExpense(id, req.user.userId)

        res.status(200).json(result)
    } catch(err) {
        next(err)
    }
}