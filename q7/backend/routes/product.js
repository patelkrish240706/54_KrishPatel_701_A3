const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        });

        await product.save();

        res.json({
            message: "Product added successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/list", async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category");

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/category/:id", async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.id
        }).populate("category");

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;