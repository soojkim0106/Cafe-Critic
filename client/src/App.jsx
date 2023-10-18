// import NavBar from "./components/NavBar"
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { useState } from 'react';


function App() {
  
  const [closetItems, setClosetItems] = useState([]);

  return (
  <div className="App">


    <NavBar/>
    <Outlet context={[closetItems, setClosetItems]} />

  </div>
  );
}

export default App;
