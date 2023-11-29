import React, { useEffect, useState } from "react";
import {Link, Switch, Route } from "react-router-dom";
import Header from "./Header"
import CheckIn from "./CheckIn";
import Reviews from "./Reviews"
import WorkoutSchedule from "./WorkoutSchedule";
import Home from "./Home"


function App() {
  return (
      <div className="app">
        <Header />
        <Home />
        <Reviews />
        <CheckIn />
        <WorkoutSchedule />
    </div>
  )
}

export default App;
