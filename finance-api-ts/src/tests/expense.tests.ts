// Expense tests
import request from "supertest";
import app from "../app.js";
import { Expense } from "../models/expense.model.js";
import { getAuthToken } from "./helper.js";

describe("Expense API", () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken()
    })

    beforeEach(async () => {
        await Expense.deleteMany({})
    })

    it("should create an expense", async () => {
        const res = await request(app).post("/expenses").set("Authorization", `Bearer ${token}`).send({
            title: "Server Hosting",
            amount: 50,
            category: "Business"
        });

        expect(res.statusCode).toBe(201)
    });

    it("should fail without a token", async () => {
        const res = await request(app).post("/expenses").send({
            title: "Test",
            amount: 100,
            category: "Business"
        })

        expect(res.statusCode).toBe(401)
    })

    it("should fail with invalid data", async () => {
        const res = await request(app)
            .post("/expenses")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "",
                amount: -10,
                category: ""
            });
        expect(res.statusCode).toBe(400);
    });

    it("should fetch expenses", async () => {
        await request(app)
            .post("/expenses")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Food",
                amount: 100,
                category: "Food"
            });

        const res = await request(app)
            .get("/expenses")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();

    })
});