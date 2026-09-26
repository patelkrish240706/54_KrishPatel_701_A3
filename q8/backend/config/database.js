const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
  "studentdb",
  "root",
  "",
  {
    host:"localhost",
    dialect:"mysql"
  }
);

module.exports = sequelize;