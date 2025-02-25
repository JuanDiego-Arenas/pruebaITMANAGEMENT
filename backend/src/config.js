import { config } from "dotenv";
config();

export const URI_MONGO = process.env.URI_MONGO;
export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET;
export const TOKEN = process.env.TOKEN;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';