const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
// check_name, display_name, price, weight, calories, protein
// carbs, fats, salt

class Product extends Model {}

Product.init(
  {
    check_name: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    display_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    carbs: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fats: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Products",
    timestamps: false
  }
);



module.exports = Product;
