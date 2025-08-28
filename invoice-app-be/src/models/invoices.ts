import { DataTypes } from "sequelize";
import { sequelize } from "@/db_config"

// model invoices
const Invoice = sequelize.define("Invoice", {
    invoice_no: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    customer: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    salesperson: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    payment_type: {
        type: DataTypes.ENUM("CASH", "CREDIT", "NOTCASHORCREDIT"),
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: "invoices"
});

export default Invoice