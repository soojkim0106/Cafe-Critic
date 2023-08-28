import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import './FlipBook.css';

function App() {
  return <h1>Phase 4 Project Client</h1>;
}

const FlipBook = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-book ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="page page-front">Page 1</div>
      <div className="page page-back">Page 2</div>
    </div>
  );
};

export default FlipBook;