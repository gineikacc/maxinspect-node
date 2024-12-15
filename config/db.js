var { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  "maxinspect",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);
  sequelize.authenticate()
  .then(()=>{console.log("L : Auth Success!");})
  .catch(()=>{console.log("E : Auth Failure!");})

module.exports = sequelize;

