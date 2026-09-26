const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
    res.render("form", {
        errors: [],
        data: {}
    });
});

app.post(
    "/register",

    upload.fields([
        { name: "profilepic", maxCount: 1 },
        { name: "otherpics", maxCount: 5 }
    ]),

    [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),

        body("confirmpassword")
            .notEmpty()
            .withMessage("Confirm password is required"),

        body("email")
            .trim()
            .isEmail()
            .withMessage("Enter a valid email"),

        body("gender")
            .notEmpty()
            .withMessage("Please select gender"),

        body("hobbies")
            .custom((value) => {
                if (!value) {
                    throw new Error("Select at least one hobby");
                }
                return true;
            })
    ],

    function (req, res) {

        let errors = validationResult(req);

        let data = req.body;

        if (data.password !== data.confirmpassword) {
            errors.errors.push({
                path: "confirmpassword",
                msg: "Passwords do not match"
            });
        }

        if (!req.files || !req.files.profilepic) {
            errors.errors.push({
                path: "profilepic",
                msg: "Profile picture is required"
            });
        }

        if (!errors.isEmpty()) {
            return res.render("form", {
                errors: errors.array(),
                data: data
            });
        }

        res.render("result", {
            data: data,
            profilepic: req.files.profilepic[0],
            otherpics: req.files.otherpics || []
        });
    }
);

app.get("/download/:filename", function (req, res) {

    let filepath = path.join(__dirname, "uploads", req.params.filename);

    res.download(filepath, function (err) {
        if (err) {
            console.log(err);
        }
    });

});

app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});