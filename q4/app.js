const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "erpsecret",
        resave: false,
        saveUninitialized: false
    })
);

mongoose.connect("mongodb://127.0.0.1:27017/erp")
    .then(function () {
        console.log("MongoDB connected");
    })
    .catch(function (err) {
        console.log(err);
    });

const employeeSchema = new mongoose.Schema({

    empid: String,

    name: String,

    email: String,

    department: String,

    basicSalary: Number,

    hra: Number,

    da: Number,

    totalSalary: Number,

    password: String

});

const Employee = mongoose.model("Employee", employeeSchema);


// Admin login

app.get("/", function (req, res) {
    res.render("login");
});

app.post("/login", function (req, res) {

    let username = req.body.username;
    let password = req.body.password;

    if (username === "admin" && password === "1234") {

        req.session.admin = username;

        res.redirect("/dashboard");

    } else {

        res.send("Invalid admin username or password");

    }

});


// Check admin session

function checklogin(req, res, next) {

    if (req.session.admin) {
        next();
    } else {
        res.redirect("/");
    }

}


// Dashboard

app.get("/dashboard", checklogin, function (req, res) {

    res.render("dashboard");

});


// Show employees

app.get("/employees", checklogin, async function (req, res) {

    let employees = await Employee.find();

    res.render("employees", {
        employees: employees
    });

});


// Add employee page

app.get("/add", checklogin, function (req, res) {

    res.render("add");

});


// Add employee

app.post("/add", checklogin, async function (req, res) {

    let lastEmployee = await Employee.findOne().sort({ _id: -1 });

    let number = 1;

    if (lastEmployee) {
        number = parseInt(lastEmployee.empid.replace("EMP", "")) + 1;
    }

    let empid = "EMP" + number;

    let password = Math.random().toString(36).slice(-8);

    let hashedPassword = await bcrypt.hash(password, 10);

    let basicSalary = Number(req.body.basicSalary);

    let hra = basicSalary * 0.20;

    let da = basicSalary * 0.10;

    let totalSalary = basicSalary + hra + da;

    let employee = new Employee({

        empid: empid,

        name: req.body.name,

        email: req.body.email,

        department: req.body.department,

        basicSalary: basicSalary,

        hra: hra,

        da: da,

        totalSalary: totalSalary,

        password: hashedPassword

    });

    await employee.save();


    // Email

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yourgmail@gmail.com",
            pass: "your-app-password"
        }
    });

    let mailOptions = {

        from: "yourgmail@gmail.com",

        to: req.body.email,

        subject: "ERP Employee Account",

        text:
            "Your employee account has been created.\n\n" +
            "Employee ID: " + empid + "\n" +
            "Password: " + password

    };

    transporter.sendMail(mailOptions, function (err) {

        if (err) {
            console.log(err);
        }

    });

    res.redirect("/employees");

});


// Edit page

app.get("/edit/:id", checklogin, async function (req, res) {

    let employee = await Employee.findById(req.params.id);

    res.render("edit", {
        employee: employee
    });

});


// Update employee

app.post("/edit/:id", checklogin, async function (req, res) {

    let basicSalary = Number(req.body.basicSalary);

    let hra = basicSalary * 0.20;

    let da = basicSalary * 0.10;

    let totalSalary = basicSalary + hra + da;

    await Employee.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            basicSalary: basicSalary,
            hra: hra,
            da: da,
            totalSalary: totalSalary
        }
    );

    res.redirect("/employees");

});


// Delete employee

app.get("/delete/:id", checklogin, async function (req, res) {

    await Employee.findByIdAndDelete(req.params.id);

    res.redirect("/employees");

});


// Logout

app.get("/logout", function (req, res) {

    req.session.destroy(function () {

        res.redirect("/");

    });

});


app.listen(3000, function () {

    console.log("Server running at http://localhost:3000");

});