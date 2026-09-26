const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// Add category
router.post("/add", async (req, res) => {

    try {

        const category = new Category({
            name: req.body.name
        });

        await category.save();

        res.json({
            message: "Category added successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// Get all categories
router.get("/list", async (req, res) => {

    try {

        const categories = await Category.find();

        res.json(categories);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// Delete category
router.delete("/delete/:id", async (req, res) => {

    try {

        await Category.findByIdAndDelete(req.params.id);

        res.json({
            message: "Category deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;