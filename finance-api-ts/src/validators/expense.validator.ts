// Expense schema validation
import {z} from "zod";

const title = z.string().min(1, "Expense title required")
const amount = z.number().positive("Amount must be greater than 0")
const category = z.string().min(1, "Category is required")

// Schema for creating expense
export const createExpenseSchema = z.object({
    title,
    amount,
    category
})