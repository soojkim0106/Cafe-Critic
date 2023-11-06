// App.jsx
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { WeatherProvider } from './WeatherContext';

function App() {
  const [closetItems, setClosetItems] = useState([]);

  return (
      //   by wrapping the entire application with WeatherProvider, im ensuring that the weathercontext is available to all the components in my app, including Closet and Weather
    <WeatherProvider>

      <div className="app-container">

        <NavBar />
  
        <Outlet context={[closetItems, setClosetItems]} />

    </div>





    </WeatherProvider>
  );
}

export default App;
