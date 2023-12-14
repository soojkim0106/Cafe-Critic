import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import { Button } from "@mui/material";


function App() {
  const [user, setUser]= useState(null)

  useEffect(()=>{
    fetch('/authorized')
    .then((resp) =>{
      if (resp.ok){
        resp.json().then((user) => {
          setUser(user)
        })
      }else{
        console.log('error')
      }
    })
  },[])
  function handleLogOut(){
    fetch('/logout',{
      method: 'DELETE',
    }).then((resp)=>{
      if (resp.ok){
        setUser(null)
      }
    })
  }
  if (!user) {
  return <Signup setUser={setUser} /> }

  
    return (
    <div>
    <Home/>
    <Button variant="contained" onClick={handleLogOut}>Logout</Button>
    
    </div>
    

  )}

export default App;
