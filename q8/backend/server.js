const {DataTypes} = require("sequelize");

const sequelize = require("./config/database");
const Student = sequelize.define("Student",{

  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },

  name:{
    type:DataTypes.STRING
  },

  email:{
    type:DataTypes.STRING
  },

  course:{
    type:DataTypes.STRING
  },

  age:{
    type:DataTypes.INTEGER
  }

});

module.exports = Student;