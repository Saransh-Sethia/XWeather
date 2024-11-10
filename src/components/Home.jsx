import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [queryField, setQueryField] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);

  const handleChange = (event) => {
    setQueryField(event.target.value);
  };

  const fetchData = async(query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=3b6b80ba9b54422e8bd33414240901&q=${query}`
      );
      const result = Object.values(await response.data);
      setCity(result || []);
      setLoading(false);
    } catch (error) {
      console.log('error-1',error)
      alert("Failed to fetch weather data");
    }
  };
  return (
    <div>
      <input
        placeholder="Enter city name"
        value={queryField}
        onChange={handleChange}
      />
      <button onClick={() => fetchData(queryField)}>Search</button>
{
  !loading ? (
    <>
      {
city.map((details,id) => (
  <div className="weather-cards" key={id}>
    <div className="weather-card"><strong>Temperature</strong>{details.temp_c}°C</div>
    <div className="weather-card"><strong>Humidity</strong>{details.humidity}%</div>
    <div className="weather-card"><strong>Condition</strong>
{Object.values(details.condition || {})[0]}
    </div>
    <div className="weather-card"><strong>Wind Speed</strong>{details.wind_kph} kph</div>
  </div>
)
      )}
      </>
  ) : (
    <p>Loading data...</p>
  )
}
    </div>
  );
};

export default Home;
