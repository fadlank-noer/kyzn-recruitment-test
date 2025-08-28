import Invoice from "@/models/invoices";
import ProductSold from "@/models/product_solds";
import { sequelize } from "@/db_config";

// Relation
Invoice.hasMany(ProductSold, { foreignKey: "invoice_no", onDelete: "CASCADE", as: "products" });
ProductSold.belongsTo(Invoice, { foreignKey: "invoice_no", as: "invoice" });

async function initDB(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log("Database OK!");
    
        // sync schema
        await sequelize.sync({ force: false });
        console.log("Database initialized with Sequelize schema");
    } catch (err) {
        console.error("Error initializing DB:", err);
        throw new Error("Initialize Error!")
    }
}
  
export {
    initDB,
    Invoice,
    ProductSold
}