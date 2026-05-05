import dotenv from "dotenv";
import {z} from "zod";

dotenv.config()

// env schema
const envSchema = z.object({
    PORT: z.string().default("3000"),
    MONGO_URI: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.format())
    process.exit(1)
}

// Env used everywhere
export const env = {
    port: Number(parsed.data.PORT),
    mongoUri: parsed.data.MONGO_URI,
    jwtSecret: parsed.data.JWT_SECRET,
    jwtRefreshSecret: parsed.data.JWT_REFRESH_SECRET,
    nodeEnv: parsed.data.NODE_ENV
}
