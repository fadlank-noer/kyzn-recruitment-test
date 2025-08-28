// src/models/invoices.ts
import { DataTypes } from "sequelize";

// src/db_config.ts
import { Sequelize } from "sequelize";
import * as path from "path";
var sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve("database.sqlite"),
  logging: false
});

// src/models/invoices.ts
var Invoice = sequelize.define("Invoice", {
  invoice_no: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  customer: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  salesperson: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  payment_type: {
    type: DataTypes.ENUM("CASH", "CREDIT", "NOTCASHORCREDIT"),
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "invoices"
});
var invoices_default = Invoice;

// src/models/product_solds.ts
import { DataTypes as DataTypes2 } from "sequelize";
var ProductSold = sequelize.define("ProductSold", {
  invoice_no: {
    type: DataTypes2.INTEGER,
    allowNull: false
  },
  item: {
    type: DataTypes2.TEXT,
    allowNull: false
  },
  quantity: {
    type: DataTypes2.INTEGER,
    allowNull: false
  },
  total_cogs: {
    type: DataTypes2.INTEGER,
    allowNull: false
  },
  total_price: {
    type: DataTypes2.INTEGER,
    allowNull: false
  }
}, {
  tableName: "product_solds"
});
var product_solds_default = ProductSold;

// src/models/db_index.ts
invoices_default.hasMany(product_solds_default, { foreignKey: "invoice_no", onDelete: "CASCADE" });
product_solds_default.belongsTo(invoices_default, { foreignKey: "invoice_no" });
async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Database OK!");
    await sequelize.sync({ force: false });
    console.log("Database initialized with Sequelize schema");
  } catch (err) {
    console.error("Error initializing DB:", err);
    throw new Error("Initialize Error!");
  }
}

// src/index.ts
async function main() {
  await initDB();
}
main();
//# sourceMappingURL=index.js.map