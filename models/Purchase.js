const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.js");
const Receipt = require("./Receipt.js");
const Product = require("./Product.js");

class Purchase extends Model {}

Purchase.init(
  {
    receipt_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Purchases",
    timestamps: false,
  }
);

Purchase.belongsTo(Receipt, { foreignKey: "receipt_id" });
Receipt.hasMany(Purchase);

Purchase.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Purchase);


module.exports = Purchase;
