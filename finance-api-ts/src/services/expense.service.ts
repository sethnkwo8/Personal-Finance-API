// Expense services
import { Expense } from "../models/expense.model.js";
import { Types } from "mongoose";
import { AppError } from "../utils/AppError.js";

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
export async function getExpenses(
    userId: string,
    page: number,
    limit: number,
    category?: string
) {
    if (!Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user ID", 400);
    }

    const userObjectId = new Types.ObjectId(userId)

    // Initialize query with user ID
    const query: any = {userId: userObjectId}

    // Filtering
    if (category) {
        query.category = category
    }

    // Pages skip
    const skip = (page - 1) * limit;

    // Get expenses
    const [expenses, total] = await Promise.all([
        Expense.find(query)
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .lean(), 
            Expense.countDocuments(query)]);

    // Return expenses
    return {
        data: expenses.map(e => ({
            id: e._id.toString(),
            title: e.title,
            amount: e.amount,
            category: e.category,
            createdAt: e.createdAt
        })),
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}

// Delete user expense
export async function deleteExpense(id: string, userId: string) {
    // Check if id is valid ObjectId
    if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user ID", 400);
    }

    // Convert ids to ObjectIds
    const expenseId = new Types.ObjectId(id)
    const userObjectId = new Types.ObjectId(userId)

    // Delete expense
    const result = await Expense.findOneAndDelete({_id: expenseId, userId: userObjectId})

    if (!result) {
        throw new AppError("Expense not found or unauthorized", 404);
    }

    return {
        message: "Expense deleted successfully"
    }
}