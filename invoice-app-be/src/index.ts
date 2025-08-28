import express, { type Express } from "express";
import { initDB } from "@/models/index"
import PublicRoute from "@/common/routes"
import cors from "cors"

// Load ENV
import { env } from "@/common/config"

async function main() {
    // Initialize Sqlite DB
    await initDB()

    // Call Express
    const app: Express = express();

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: "*",        
        methods: ["GET", "POST"]
    }))

    // Call Routes
    app.use("/api/v1", PublicRoute)

    // Server Listen
    app.listen(env.PORT, () => {
        const { HOST, PORT } = env;
        console.info(`Server running on port http://${HOST}:${PORT}`);
    });
}

main()