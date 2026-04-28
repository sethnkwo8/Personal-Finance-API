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
        name: user.email,
        email: user.email
    };
}

// Login user service
export async function loginUser(
    email: string,
    password: string
) {
    const user = await User.findOne({email})

    if (!user) {
        const err = new Error("User not found");
        (err as any).statusCode = 404;
        throw err
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const err = new Error("Incorrect password");
        (err as any).statusCode = 401;
        throw err
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
    )

    return token
}