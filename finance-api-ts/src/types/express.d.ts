// Interface for authenticated request
import { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
    }
}