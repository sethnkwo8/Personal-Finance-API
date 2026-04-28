// Auth controller
import { Request, Response, NextFunction } from "express";
import { loginUser, signUpUser } from "../services/auth.service.js";

// Signup controller
export async function signUp(req: Request, res: Response, next: NextFunction) {
    const {name, email, password} = req.body;

    try{
        // Call service function
        const user = await signUpUser(name, email, password);

        res.status(201).json({
            message: "User created",
            user
        })

    } catch(err) {
        next(err)
    }
}

// Login controller
export async function login(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body;

    try {
        // Call service function
        const token = await loginUser(email, password);

        res.status(200).json({
            token
        })
    } catch(err) {
        next(err)
    }
}