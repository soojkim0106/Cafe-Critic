import { createContext, useContext, useState } from "react";

const WeatherContext = createContext()

// creating a component
export const useWeatherData = () => {
    return useContext(WeatherContext)
}

export const WeatherProvider = ({children}) => {
    const [weatherData, setWeatherData] = useState(null)
    
    return (
        //  here im providing the weather data and updating the function via context
        <WeatherContext.Provider
        value={{ weatherData, setWeatherData }}>
                {children}
        </WeatherContext.Provider>
    )
}

