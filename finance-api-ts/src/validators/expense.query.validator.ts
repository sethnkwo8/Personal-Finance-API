// Expensequery schema
import {z} from "zod";

// Category query validation
const category = z.string().optional()

// startDate query validation
const startDate = z.string()
.optional()
.refine(val => !val || !isNaN(Date.parse(val)), {
    message: "Invalid start date"
})

// endDate query validation
const endDate = z.string()
.optional()
.refine(val => !val || !isNaN(Date.parse(val)), {
    message: "Invalid end date"
})

// Page query validation
const page= z.string()
.optional()
.refine(val => !val || !isNaN(Number(val)), {
    message: "Page must be a number"
})
.transform(val => (val ? Number(val) : 1))

// limit query validation
const limit = z.string()
.optional()
.refine(val => !val || !isNaN(Number(val)), {
    message: "Limit must be a number"
})
.transform(val => (val ? Number(val) : 10))

// minAmount query validation
const minAmount = z.string()
.optional()
.refine(val => !val || !isNaN(Number(val)), {
    message: "minAmount must be a number"
})
.transform(val => (val ? Number(val) : undefined))

// maxAmout query validation
const maxAmount = z.string()
.optional()
.refine(val => !val || !isNaN(Number(val)), {
    message: "maxAmount must be a number"
})
.transform(val => (val ? Number(val) : undefined))

export const expenseQuerySchema = z.object({
    page,
    limit,
    category,
    minAmount,
    maxAmount,
    startDate,
    endDate
})