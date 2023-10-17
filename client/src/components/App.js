import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import PetPage from "./PetPage";

function App() {
  return (
    <div className="app">
      <Header />
      <PetPage />
    </div>
  );
}

export default App;