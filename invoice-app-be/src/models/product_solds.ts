import { DataTypes } from "sequelize";
import { sequelize } from "@/db_config"

const ProductSold = sequelize.define("ProductSold", {
    invoice_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_cogs: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "product_solds"
});

export default ProductSold