// Services for auth
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// User signup service
export async function signUpUser(
    name: string,
    email: string,
    password: string
) {
    // Check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        const err = new Error("User already exists");
        (err as any).statusCode = 400;
        throw err
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // Return user details
    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
}