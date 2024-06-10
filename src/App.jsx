import React, { useState } from 'react';
import './index.css';
import './App.css';  // Додамо імпорт для App.css, якщо потрібно

const API = {
  key: "137f31dc2a7f25a6716562e888cdb640",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = () => {
    fetch(`${API.baseUrl}weather?q=${query}&units=metric&APPID=${API.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setQuery("");
        setErrorMsg("");
      })
      .catch(error => {
        setErrorMsg(error.message);
        setWeatherData(null);
      });
  };

  return (
    <div className='weather-app'>
      <header className='weather-header'>
        <h1>Weather App</h1>

        <div className="input-container">
          <input 
            type="text" 
            placeholder='Enter city name...' 
            className="input-field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="input-button">Search</button>
        </div>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        {weatherData && (
          <div className="weather-details">
            <h2 className="location">{weatherData.name}</h2>
            <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
            <p className="condition">{weatherData.weather[0].main}</p>
            <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
            <p className="wind">Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default WeatherApp;
