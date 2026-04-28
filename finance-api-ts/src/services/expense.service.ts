// Expense services
import { Expense } from "../models/expense.model.js";
import { Types } from "mongoose";

// Create expense service
export async function createExpense(
    title: string,
    amount: number,
    category: string,
    userId: Types.ObjectId
) {
    // Create expense
    const expense = await Expense.create({
        title,
        amount,
        category,
        userId
    })

    return {
        id: expense._id.toString(),
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        userId: expense.userId
    }
}

// Get all user expenses service
export async function getExpenses(userId: Types.ObjectId) {
    // Get expenses
    const expenses = await Expense.find({userId}).sort({createdAt: -1}).lean();

    // Return expenses
    return expenses.map(e => ({
        id: e._id.toString(),
        title: e.title,
        amount: e.amount,
        category: e.category,
        userId: e.userId
    }))
}

// Delete user expense
export async function deleteExpense(id: string, userId: Types.ObjectId) {
    // Check if id is valid ObjectId
    if (!Types.ObjectId.isValid(id)) {
        const err = new Error("Invalid Expense ID");
        (err as any).statusCode = 400;
        throw err
    }

    // Convert id to ObjectId
    const expenseId = new Types.ObjectId(id)

    // Delete expense
    const result = await Expense.findOneAndDelete({_id: expenseId, userId: userId})

    if (!result) {
        const err = new Error("Expense not found or unauthorized");
        (err as any).statusCode = 404;
        throw err
    }

    return {
        message: "Expense deleted successfully"
    }
}