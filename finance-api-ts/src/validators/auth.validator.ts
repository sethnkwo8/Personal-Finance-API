// Auth schema validator
import {z} from "zod";

const name = z.string().min(1, "Name required")
const email = z.string().email().trim().toLowerCase();
const password = z.string()
.min(8, "Password has to contain more than 8 characters")
.max(32, "Password can't exceed 32 characters")

export const signUpSchema = z.object({
    name,
    email,
    password
})

export const loginSchema = z.object({
    email,
    password
})