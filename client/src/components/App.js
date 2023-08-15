import {React, useEffect, useState } from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"
import MyTrips from './MyTrips'
import Social from './Social'
import Auth from './Auth'

function App() {
  const [ user, setUser ] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser = () => {
    fetch("/authorized")
      .then( r => {
        if (r.ok) {
          r.json().then( user => setUser(user) )
        }
      })
  }

  return (
    <div className="App">
      {user ? <NavBar user={user} setUser={setUser} navigate={navigate}/> : null}
      <Routes>
        <Route path='/' element={<Auth  setUser={setUser} navigate={navigate}/>}></Route>
        <Route path='home' element={<Home />} />
        <Route path='trips' element={<MyTrips user = {user}/>} />
        <Route path='social' element={<Social user = {user}/>} />
      </Routes>
    </div>
  );
}

export default App;
