const express = require("express");
const Leave = require("../models/Leave");
const auth = require("../middleware/auth");

const router = express.Router();

// Add leave
router.post("/add", auth, async (req, res) => {

    try {

        const { date, reason, grant } = req.body;

        const leave = new Leave({
            empid: req.empid,
            date: date,
            reason: reason,
            grant: grant
        });

        await leave.save();

        res.json({
            message: "Leave added successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// List leaves
router.get("/list", auth, async (req, res) => {

    try {

        const leaves = await Leave.find({
            empid: req.empid
        });

        res.json(leaves);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;