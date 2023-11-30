import React, { useEffect, useState } from "react";
import {Link, Switch, Route } from "react-router-dom";
import Header from "./Header"
import Reviews from "./Reviews"
import WorkoutSchedule from "./WorkoutSchedule";
import Home from "./Home"


function App() {
  return (
      <div className="flex-container">
        <div className="flex-box1">
        <Home />
        <Reviews />
        </div>
        <div className="flex-box2">
        <Header />
        </div>
        <div className="flex-box3">
        <WorkoutSchedule />
        </div>
    </div>
  )
}

export default App;
