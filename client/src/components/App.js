import React, { useEffect, useState } from "react";
import { Switch, Route, useNavigate } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast'
import NavBar from './navigation/NavBar'
import CatForm from "./project/CatForm";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cats, setCats] = useState([])
  const navigate = useNavigate()

  //GET Cats
  useEffect(() => {
    fetch("/cats")
    .then(resp => {
      if (resp.ok) {
        return resp.json().then(setCats)
      }
      return resp.json().then(errorObj => toast.error(errorObj.message))
    })
    .catch(err => console.log(err))
}, []);
const updateCurrentUser = (user) => setCurrentUser(user)

// useEffect(() => {
//   fetch("/me")
//   .then(resp => {
//     if (resp.ok) {
//       resp.json().then(updateCurrentUser)
//     } else {
//       toast.error("Please log in!")
//     }
//   })
// }, []);
  
  
  
  return (
    <>
      <NavBar currentUser={currentUser} />
    </>
  );
}

export default App;
