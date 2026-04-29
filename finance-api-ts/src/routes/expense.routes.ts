// Expense routes
import express from "express"
import { validate } from "../middleware/validate.js"
import { createExpenseSchema } from "../validators/expense.validator.js"
import { create, get, remove } from "../controllers/expense.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(protect)

// GET route
router.get("/", get)

// POST route
router.post("/", validate(createExpenseSchema), create)

// DELETE route
router.delete("/:id", remove)

export default router