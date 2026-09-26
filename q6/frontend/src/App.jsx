import { useState } from "react";

function App() {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const getWeather = async () => {

        if (city === "") {
            setError("Please enter city name");
            setWeather(null);
            return;
        }

        try {

            setError("");

            const response = await fetch(
                `http://localhost:5000/api/weather?city=${city}`
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                setWeather(null);
                return;
            }

            setWeather(data);

        } catch (error) {

            setError("Unable to connect to backend");
            setWeather(null);
        }
    };

    return (
        <div>

            <h1>Weather Utility</h1>

            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={getWeather}>
                Get Weather
            </button>

            {error && (
                <p>{error}</p>
            )}

            {weather && (
                <div>

                    <h2>Weather of {weather.city}</h2>

                    <p>
                        Temperature: {weather.temperature} °C
                    </p>

                    <p>
                        Feels Like: {weather.feelsLike} °C
                    </p>

                    <p>
                        Humidity: {weather.humidity} %
                    </p>

                    <p>
                        Wind Speed: {weather.windSpeed} km/h
                    </p>

                    <p>
                        Condition: {weather.condition}
                    </p>

                </div>
            )}

        </div>
    );
}

export default App;