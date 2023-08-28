import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from './Nav'
import signup from './signup'

handleSubmit = (event) => {
  fetch('http://localhost:5555', {
      method: 'POST',
            }).then(function(response) {
      console.log(response)
      return response.json();
    });

  event.preventDefault();
}

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" render={() => <Home/>} />
        <Route exact path="/signup" render={() => <signup />} />
      </Switch>
    </div>
  )
}

export default App;
