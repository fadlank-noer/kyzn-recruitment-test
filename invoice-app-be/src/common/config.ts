import dotenv from "dotenv";

dotenv.config();

interface ValueENV {
    HOST: string
    PORT: number
    DATABASE_URL: string
}

export const env: ValueENV = {
	HOST: process.env?.HOST ?? "localhost",
    PORT: +(process.env?.PORT ?? "3002"),
    DATABASE_URL: process.env?.DATABASE_URL ?? "database.sqlite",
};