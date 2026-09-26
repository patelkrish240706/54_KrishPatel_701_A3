const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Employee = require("./models/Employee");

async function createEmployee() {

    await mongoose.connect("mongodb://127.0.0.1:27017/erp");

    const password = await bcrypt.hash("1234", 10);

    const employee = new Employee({
        empid: "E001",
        name: "Jay",
        email: "jay@gmail.com",
        department: "IT",
        basicSalary: 30000,
        hra: 5000,
        da: 3000,
        totalSalary: 38000,
        password: password
    });

    await employee.save();

    console.log("Employee created successfully");
    console.log("Employee ID: E001");
    console.log("Password: 1234");

    mongoose.connection.close();
}

createEmployee();