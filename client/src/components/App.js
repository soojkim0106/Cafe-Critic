import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
  <div className="homepage-container">
    <div className="title">The Gym</div>
    <hr class="solid"></hr>
    <div className="content">
      <h1 className="homepage-reviews">Reviews</h1>
      <h1 className="homepage-checkin">Check in</h1>
      <h1 className="homepage-workout">Workout Schedule</h1>
    </div>
  </div>
  )
}

export default App;
