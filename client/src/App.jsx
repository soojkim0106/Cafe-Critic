// import NavBar from "./components/NavBar"
import { Outlet } from 'react-router-dom'
import ClothingItemList from './components/ClothingItemList';


function App() {

  return (
  <div className="App">


    <Outlet/>

  </div>
  );
}

export default App;
