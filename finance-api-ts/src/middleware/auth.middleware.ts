// Auth middleware
import { AuthRequest } from "../types/express.js";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export function protect(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        })
    }

    const parts = authHeader.split(" ")

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Invalid token format"
        })
    }

    const token = parts[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string};

        req.user = {
            userId: decoded.userId
        }

        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}