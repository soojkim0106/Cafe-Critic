// import { useState } from "react";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ClothingItemCard from "./ClothingItemCard";
import { useOutletContext } from "react-router-dom";
import { useWeatherData } from "../WeatherContext";

function Closet() { 
  const [closetItems, setClosetItems] = useOutletContext([]);
  const { weatherData, setWeatherData } = useWeatherData();
  const [cityInput, setCityInput] = useState("");
  const [error, setError] = useState(null);


  
  const handleCityInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const tempFahrenheit = Math.round(weatherData?.main.temp * 9 / 5 + 32)

  function categoriseWeather() {
    if (tempFahrenheit > 74) {
      return "hot"
    } else if (tempFahrenheit < 60) {
      return "cold" 
    } else { 
      return "comfortable"
    }
  }
  
  const filteredClosetItems = closetItems.filter((closetObj) => {
    const weatherCondition = categoriseWeather(
      Math.round(weatherData?.main.temp * 9 / 5 + 32)
      )
      return closetObj.item_object.tags.includes(weatherCondition)
  })



  const handleSearch = () => {
    const apiKey = "b3d50e6d1a67d2062441f0ee4f232c00";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityInput}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError("Invalid city name");
        setWeatherData(null);
      });
  };
  


  const OPTIONS = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }

  useEffect(() => {
    fetch(`/closet/3`, OPTIONS)
    .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setClosetItems(data);
          console.log(data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching closet data:", error);
      });
  }, []);
  

  
  const mappedClosetItems = closetItems.map((closetObj) => (
    <ClothingItemCard 
    key={closetObj.id} 
    closetObj = {closetObj}
    clothingObj={closetObj.item_object} /> ))
    
    

    return (
      <div className="closet-page">
        <div className="weather-display">
          <div className="details">
            <div className="col">
              <h2>{weatherData?.name}</h2>
              <p>Temperature: {Math.round(weatherData?.main.temp * 9 / 5 + 32)}°F</p>
              <img
                src={`images/${weatherData?.weather[0].main.toLowerCase()}.png`}
                className="weather-icon"
                alt="Weather"
              />
            </div>
            <div className="col">
              <img src="images/humidity.png" alt="Humidity" />
              <div>
                <p className="humidity">{weatherData?.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="images/wind.png" alt="Wind Speed" />
              <div>
                <p className="wind">{weatherData?.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
    
        <div className="content-container">
          <div className="closet-container">
            {closetItems.length > 0 ? (
              mappedClosetItems
            ) : (
              <p>Your closet is empty. Add items to your closet!</p>
            )}
          </div>
    
          <div className="outfit-generator">
            <input
              type="text"
              placeholder="Enter city name"
              spellCheck="false"
              value={cityInput}
              onChange={handleCityInputChange}
            />
    
            <button onClick={handleSearch}>
              <img src="images/search.png" alt="Search" />
            </button>
    
            <div className="error" style={{ display: error ? "block" : "none" }}>
              <p>{error}</p>
            </div>
    
            <div className="generator-result">
              {/* Map and render filtered clothing items here */}
              {filteredClosetItems.map((closetObj) => (
                <div key={closetObj.item_object.id}>
                  <img
                    src={closetObj.item_object.image_url}
                    alt={closetObj.item_object.name}
                    width="150"
                    height="150"
                  />
                  {/* <p>{closetObj.item_object.name}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

    }
    
    export default Closet;