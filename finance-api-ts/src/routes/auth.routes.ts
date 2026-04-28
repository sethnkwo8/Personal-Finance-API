// Auth routes
import express from "express"
import { signUp, login } from "../controllers/auth.controller.js"

const router = express.Router()

// Signup route
router.post('/signup', signUp)

// Login route
router.post('/login', login)

export default router