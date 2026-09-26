const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Q6 Utility API");
});

app.get("/api/weather", async (req, res) => {

    try {

        const city = req.query.city;

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        const data = await response.json();

        const weather = {
            city: city,
            temperature: data.current_condition[0].temp_C,
            feelsLike: data.current_condition[0].FeelsLikeC,
            humidity: data.current_condition[0].humidity,
            windSpeed: data.current_condition[0].windspeedKmph,
            condition: data.current_condition[0].weatherDesc[0].value
        };

        res.json(weather);

    } catch (error) {

        res.status(500).json({
            message: "Unable to get weather"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});