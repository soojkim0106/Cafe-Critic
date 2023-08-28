import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return <h1>Phase 4 Project Client</h1>;
}

handleSubmit = (event) => {
  fetch('http://localhost:5555', {
      method: 'POST',
            }).then(function(response) {
      console.log(response)
      return response.json();
    });

  event.preventDefault();
}

export default App;
