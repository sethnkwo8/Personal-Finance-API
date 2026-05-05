// server setup
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const PORT = env.port;

await connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})