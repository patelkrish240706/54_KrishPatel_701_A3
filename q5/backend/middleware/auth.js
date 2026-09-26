const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Access denied"
        });
    }

    try {

        const tokenData = token.split(" ")[1];

        const decoded = jwt.verify(
            tokenData,
            "secret123"
        );

        req.empid = decoded.empid;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = auth;