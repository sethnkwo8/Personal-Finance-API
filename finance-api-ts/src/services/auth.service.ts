// Services for auth
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError.js";

// User signup service
export async function signUpUser(
    name: string,
    email: string,
    password: string
) {
    // Check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new AppError("User already exists", 400)
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

// Login user service
export async function loginUser(
    email: string,
    password: string
) {
    const user = await User.findOne({email})

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Incorrect password", 401)
    }

    const accessToken = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET!,
        {expiresIn: "15m"}
    )

    const refreshToken = jwt.sign(
        {userId: user._id},
        process.env.JWT_REFRESH_SECRET!,
        {expiresIn: "7d"}
    )

    return {
        accessToken,
        refreshToken
    }
}

// Refresh access token function
export function refreshAccessTokenService(refreshToken: string) {
    if (!refreshToken) {
        throw new AppError("Unauthorized", 401)
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {userId: string}

        const {userId} = decoded

        const accessToken = jwt.sign(
            {userId},
            process.env.JWT_SECRET!,
            {expiresIn: "15m"}
        )

        return {accessToken}
    } catch (err) {
        throw new AppError("Invalid or expired refresh token", 403)
    }
}