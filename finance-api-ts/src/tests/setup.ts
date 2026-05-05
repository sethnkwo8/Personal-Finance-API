import mongoose from "mongoose";

// Runs once afterall test files in the suite have finished
afterAll(async () => {
    // Check if we are actually connected before trying to close
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});