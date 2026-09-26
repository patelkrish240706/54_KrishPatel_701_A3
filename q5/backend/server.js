const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const leaveRoutes = require("./routes/leave");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/leave", leaveRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/erp")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB error:", error);
    });

app.get("/", (req, res) => {
    res.send("Q5 Employee Site Backend");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});