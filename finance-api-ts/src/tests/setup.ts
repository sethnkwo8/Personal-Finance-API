import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer | null = null;

beforeAll(async () => {
    // Increase the timeout for the first download
    try {
        mongoServer = await MongoMemoryServer.create({
            binary: {
                version: "6.0.5",
                // Skip the MD5 check if it's causing issues, or leave default
            }
        });

        const uri = mongoServer.getUri();
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri);
        }
    } catch (error) {
        console.error("Critical: Failed to start MongoDB Memory Server", error);
    }
}, 60000); // 60 second timeout for the beforeAll hook itself

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});