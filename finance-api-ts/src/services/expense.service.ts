// Expense services
import { Expense } from "../models/expense.model.js";
import { Types } from "mongoose";

// Create expense service
export async function createExpense(
    title: string,
    amount: number,
    category: string,
    userId: string
) {
    // Create expense
    const expense = await Expense.create({
        title,
        amount,
        category,
        userId: new Types.ObjectId(userId)
    })

    return {
        id: expense._id.toString(),
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        userId: expense.userId.toString()
    }
}

// Get all user expenses service
export async function getExpenses(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
        const err = new Error("Invalid user ID");
        (err as any).statusCode = 400;
        throw err;
    }

    const userObjectId = new Types.ObjectId(userId)

    // Get expenses
    const expenses = await Expense.find({userId: userObjectId}).sort({createdAt: -1}).lean();

    // Return expenses
    return expenses.map(e => ({
        id: e._id.toString(),
        title: e.title,
        amount: e.amount,
        category: e.category,
        createdAt: e.createdAt
    }))
}

// Delete user expense
export async function deleteExpense(id: string, userId: string) {
    // Check if id is valid ObjectId
    if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
        const err = new Error("Invalid ID format");
        (err as any).statusCode = 400;
        throw err
    }

    // Convert ids to ObjectIds
    const expenseId = new Types.ObjectId(id)
    const userObjectId = new Types.ObjectId(userId)

    // Delete expense
    const result = await Expense.findOneAndDelete({_id: expenseId, userId: userObjectId})

    if (!result) {
        const err = new Error("Expense not found or unauthorized");
        (err as any).statusCode = 404;
        throw err
    }

    return {
        message: "Expense deleted successfully"
    }
}