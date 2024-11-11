import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [queryField, setQueryField] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState({});

  const handleChange = (event) => {
    setQueryField(event.target.value);
  };

  const searchData = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=3b6b80ba9b54422e8bd33414240901&q=${query}`
      );
      const result = await (response.data.current || {});
      setCity(result || {});
      console.log("result", result);
      setLoading(false);
    } catch (error) {
      console.log("error-1", error);
      alert("Failed to fetch weather data");
      setLoading(false)
    }
  };

  return (
    <div>
      <input
        placeholder="Enter city name"
        type="text"
        value={queryField}
        onChange={handleChange}
      />
      <button onClick={() => searchData(queryField)}>Search</button>
      {!loading ? (
        
          <div className="weather-cards">
            <div className="weather-card">
              <strong>Temperature</strong>
              {city.temp_c}°C
            </div>
            <div className="weather-card">
              <strong>Humidity</strong>
              {city.humidity}%
            </div>
            <div className="weather-card">
              <strong>Condition</strong>
              {Object.values(city.condition || {})[0]}
            </div>
            <div className="weather-card">
              <strong>Wind Speed</strong>
              {city.wind_kph} kph
            </div>
          </div>
        
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Home;
