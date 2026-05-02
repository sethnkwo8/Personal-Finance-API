// Error middleware
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    // Handle AppErrors
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // Invalid ObjectId from Mongo
    if ((err as any).name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        })
    }

    // Fallback
    return res.status(500).json({
        message: "Internal Server Error"
    })
}