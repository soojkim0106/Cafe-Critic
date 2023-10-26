// import NavBar from "./components/NavBar"
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { useState } from 'react';


function App() {
  
  const [closetItems, setClosetItems] = useState([]);

  return (
  <div className="App">
    <div className="user-header">
                     {/* this is where it says "Hi, {username}" */}
                </div>

    <NavBar/>
    <Outlet context={[closetItems, setClosetItems]} />


  </div>
  );
}

export default App;
