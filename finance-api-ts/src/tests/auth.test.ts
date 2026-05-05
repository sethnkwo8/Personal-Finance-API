import request from "supertest";
import app from "../app.js";
import { User } from "../models/user.model.js";

// Auth test
describe("Auth API", () => {
    // Clear database before each test to ensure fresh results
    beforeEach(async () => {
        await User.deleteMany({})
    })

    // Signup test
    describe("Signup flow", () => {
        it("should signup a user", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send({
                    name: "Seth Nkwo",
                    email: "seth@test.com",
                    password: "password123"
                })

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("user")
        });

        it("should fail if user already exists", async () => {
            const userData = { name: "Seth", email: "dup@test.com", password: "123" };
            await request(app).post("/auth/signup").send(userData);
            
            const res = await request(app).post("/auth/signup").send(userData);
            expect(res.statusCode).toBe(400);
        });
    })

    // Login test
    describe("Login flow", () => {
        it("should login a user", async () => {
            // ARRANGE: Create the user first
            await request(app).post("/auth/signup").send({
                name: "Seth Nkwo",
                email: "seth@test.com",
                password: "password123"
            });

            // ACT
            const res = await request(app)
                .post("/auth/login")
                .send({
                    email: "seth@test.com",
                    password: "password123"
                });

            // ASSERT
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("accessToken");
        });

        const testUser = {
            email: 'login-test@example.com',
            password: 'correct-password'
        };

        it('should fail if user logs in with wrong password', async () => {
            // 1. Create the user
            const signupRes = await request(app)
                .post('/auth/signup')
                .send({
                    name: "Seth",
                    email: 'unique-login-test@example.com',
                    password: 'correct-password'
                });
            
            // DEBUG: If this fails, the login will 404
            expect(signupRes.statusCode).toBe(201); 

            // 2. Attempt login
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'unique-login-test@example.com',
                    password: 'wrong-password'
                });

            expect(res.statusCode).toBe(401);
        });
    });
});