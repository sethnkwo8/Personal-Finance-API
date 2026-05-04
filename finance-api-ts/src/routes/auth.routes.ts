// Auth routes
import express from "express"
import { signUp, login, refreshAccessToken } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.js"
import { signUpSchema, loginSchema } from "../validators/auth.validator.js"

const router = express.Router()

// Signup route
router.post('/signup', validate(signUpSchema), signUp)

// Login route
router.post('/login', validate(loginSchema), login)

// Refresh access token route
router.post('/refresh', refreshAccessToken)

export default router