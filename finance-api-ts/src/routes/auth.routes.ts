// Auth routes
import express from "express"
import { signUp, login } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.js"
import { signUpSchema, loginSchema } from "../validators/auth.validator.js"

const router = express.Router()

// Signup route
router.post('/signup', validate(signUpSchema), signUp)

// Login route
router.post('/login', validate(loginSchema), login)

export default router