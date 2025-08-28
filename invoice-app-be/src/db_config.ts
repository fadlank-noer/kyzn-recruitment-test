import { Sequelize } from "sequelize";
import * as path from "path"

// Load ENV
import { env } from "@/common/config"

// Export Config
export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(env.DATABASE_URL),
    logging: false,
});
  