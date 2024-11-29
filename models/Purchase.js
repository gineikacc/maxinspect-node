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
      references:{
        model: 'Receipts',
        id: 'id'
      }
    },
    product_id: {
      type: DataTypes.STRING(64),
      primaryKey: true,
      references:{
        model: 'Products',
        id: 'check_name'
      }
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
Receipt.hasMany(Purchase, {foreignKey: 'receipt_id'});

Purchase.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Purchase, { foreignKey: "product_id" });


module.exports = Purchase;
