"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/models/invoices.ts
var import_sequelize2 = require("sequelize");

// src/db_config.ts
var import_sequelize = require("sequelize");
var path = __toESM(require("path"), 1);
var sequelize = new import_sequelize.Sequelize({
  dialect: "sqlite",
  storage: path.resolve("database.sqlite"),
  logging: false
});

// src/models/invoices.ts
var Invoice = sequelize.define("Invoice", {
  invoice_no: {
    type: import_sequelize2.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: import_sequelize2.DataTypes.DATE,
    allowNull: false
  },
  customer: {
    type: import_sequelize2.DataTypes.TEXT,
    allowNull: false
  },
  salesperson: {
    type: import_sequelize2.DataTypes.TEXT,
    allowNull: false
  },
  payment_type: {
    type: import_sequelize2.DataTypes.ENUM("CASH", "CREDIT", "NOTCASHORCREDIT"),
    allowNull: false
  },
  notes: {
    type: import_sequelize2.DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "invoices"
});
var invoices_default = Invoice;

// src/models/product_solds.ts
var import_sequelize3 = require("sequelize");
var ProductSold = sequelize.define("ProductSold", {
  invoice_no: {
    type: import_sequelize3.DataTypes.INTEGER,
    allowNull: false
  },
  item: {
    type: import_sequelize3.DataTypes.TEXT,
    allowNull: false
  },
  quantity: {
    type: import_sequelize3.DataTypes.INTEGER,
    allowNull: false
  },
  total_cogs: {
    type: import_sequelize3.DataTypes.INTEGER,
    allowNull: false
  },
  total_price: {
    type: import_sequelize3.DataTypes.INTEGER,
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
//# sourceMappingURL=index.cjs.map