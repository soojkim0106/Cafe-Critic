import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import toast ,{Toaster} from 'react-hot-toast'
import Header from './components/navigation/Header'
import { UserContext } from "./context/UserContext";

function App() {
  const {user} = useContext(UserContext)
  const [cafes, setCafes] = useState([])

  useEffect(() => {
    fetch('/cafes')
        .then(resp => {
          if (resp.ok) {
            return resp.json().then(setCafes)
          }
          return resp.json().then(errorObj => toast.error(errorObj.message))
        })
        .catch(err => console.log(err))
}, []);

return (
  <>
    <Header />
    <div><Toaster /></div>
    <Outlet context={{user, cafes}}/>
  </>
);
}

export default App;
