import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage">
      <div className="content-banner">
        {/* <img src="your-image.jpg" alt="Banner" /> */}
      </div>
      <div className="main-content">
        <div className="nav">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/collection">Collection</Link></li>
              <li><Link to="/closet">Closet</Link></li>
            </ul>
          </nav>
        </div>
        <div className="steps">
          <div className="step-card">
            <h2>Step 1: Add Items to Closet</h2>
            <p>Instructions for step 1 go here...</p>
          </div>
          <div className="step-card">
            <h2>Step 2: Enter City Name</h2>
            <p>Instructions for step 2 go here...</p>
          </div>
          <div className="step-card">
            <h2>Step 3: Generate Outfit</h2>
            <p>Instructions for step 3 go here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
