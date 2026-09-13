import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getWeather() {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // Handles trailing slash automatically to avoid double-slash routing issues on Vercel
      const rawBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";
      const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

      const res = await fetch(
        `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city.trim())}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Weatherly</h1>

      {/* Form wrapper enables Enter key submission */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
        }}
      >
        <input
          type="text"
          placeholder="Enter city (e.g. London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />

        <button
          type="submit"
          disabled={loading || !city.trim()}
          style={{ marginLeft: 8, padding: "8px 16px", fontSize: "16px", cursor: "pointer" }}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 16 }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: 20 }}>
          <h2>
            {weather.location?.name}, {weather.location?.country}
          </h2>

          <p>
            {weather.current?.temp}° - {weather.current?.description}
          </p>
          <p>Feels Like: {weather.current?.feels_like}°</p>
          <p>Humidity: {weather.current?.humidity}%</p>
          <p>Wind: {weather.current?.windSpeed} m/s</p>

          {Array.isArray(weather.forecast) && weather.forecast.length > 0 && (
            <>
              <h3>5-day Forecast</h3>
              <ul>
                {weather.forecast.map((day, index) => (
                  <li key={day.date || index}>
                    {day.date}: {day.tempMin}° / {day.tempMax}° - {day.description}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}