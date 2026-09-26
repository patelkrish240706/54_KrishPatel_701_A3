const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { empid, password } = req.body;

        const employee = await Employee.findOne({ empid });

        if (!employee) {
            return res.status(401).json({
                message: "Invalid employee ID or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            employee.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid employee ID or password"
            });
        }

        const token = jwt.sign(
            { empid: employee.empid },
            "secret123",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;