import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import toast ,{Toaster} from 'react-hot-toast'
import Header from './components/navigation/Header'
import { UserContext } from "./context/UserContext";

function App() {
  const {user} = useContext(UserContext)

return (
  <>
    <Header />
    <div><Toaster /></div>
    <Outlet context={{user}}/>
  </>
);
}

export default App;
