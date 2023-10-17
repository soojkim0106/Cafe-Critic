

function Weather() {

     // WEATHER API

     const apiKey = "b3d50e6d1a67d2062441f0ee4f232c00";
     const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
   
     // Define state variables for user input and weather data
     const [city, setCity] = useState("");
     const [weatherData, setWeatherData] = useState(null);
     const [error, setError] = useState(null);
   
     // Function to fetch weather data
     async function checkWeather() {
       try {
         const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
         const data = await res.json();
         setWeatherData(data);
         setError(null);
         } catch (error) {
         setWeatherData(null);
         setError("Invalid city name");
         }
     }

    return(

        <div>
            <div className="card">
            <div className="search">
            <input
                type="text"
                placeholder="Enter city name"
                spellCheck="false"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={checkWeather}>
                <img src="images/search.png" alt="Search" />
            </button>
            </div>
            <div className="error" style={{ display: error ? "block" : "none" }}>
            <p>{error}</p>
            </div>
    
            <div className="weather" style={{ display: weatherData ? "block" : "none" }}>
            <img
                src={`images/${weatherData?.weather[0].main.toLowerCase()}.png`}
                className="weather-icon"
                alt="Weather"
            />
            <h1 className="temp">{Math.round(weatherData?.main.temp)}°C</h1>
            <h2 className="city">{weatherData?.name}</h2>
    
            <div className="details">
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
        </div>    
        </div>
    )
}
export default Weather;