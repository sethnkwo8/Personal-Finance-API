
// Get token helper
import request from "supertest";
import app from "../app.js";

export const getAuthToken = async () => {
    const email = `test-${Date.now()}@example.com`; // Unique email to avoid collisions
    
    await request(app).post("/auth/signup").send({
        name: "Test User",
        email,
        password: "password123"
    });

    const res = await request(app).post("/auth/login").send({
        email,
        password: "password123"
    });

    return res.body.accessToken;
};