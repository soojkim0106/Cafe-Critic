import {React, useContext, useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import { UserContext } from "../context/user";
import NavBar from "./NavBar"
import Home from "./Home"
import MyTrips from './MyTrips'
import Social from './Social'
import Auth from './Auth'
import PackingList from './PackingList'
import '../styling/app.css'

function App() {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
    fetchUser()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

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
      {user ? <NavBar navigate={navigate}/> : null}
      <Routes>
        <Route path='/' element={<Auth navigate={navigate}/>}></Route>
        <Route path='home' element={<Home />} />
        <Route path='list' element={<PackingList />} />
        <Route path='trips' element={<MyTrips />} />
        <Route path='social' element={<Social />} />
        {/* social needs user */}
      </Routes>
    </div>
  );
}

export default App;
