import { config } from "dotenv";

config({ path: `.env` });

export const { PORT, NODE_ENV, GEMINI_API_KEY } = process.env;
