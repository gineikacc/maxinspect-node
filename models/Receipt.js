const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.js");

class Receipt extends Model {}

Receipt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    owner_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    date_issued: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cost_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Receipts",
    timestamps: false,
  }
);

module.exports = Receipt;
