const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/shoppingcart")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB error:", error);
    });

app.get("/", (req, res) => {
    res.send("Shopping Cart Backend");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});