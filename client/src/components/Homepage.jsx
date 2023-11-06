import React from 'react';

function Homepage() {
  return (
    <div className="homepage">

      <div className='content-banner-box'>
        <h1 className='text-fashion'>FASHION</h1>
        <h1 className='text-forecast'>FORECAST</h1>
        {/* INSERT HORIZONTAL LINE */}
        <h3 className='slogan'>dressed by weather</h3>
        <button className='download-btn'>DOWNLOAD THE APP TODAY</button>
      </div>


        <div className="content-banner">
          <img src="/images/banner2.jpg" alt="banner" />

          
          <h1>Welcome to Fashion Forecast!</h1>
          <p>Discover your style with our fashion app.</p>
        </div>

      <div className="main-content">
        
        <div className="step-cards-container">

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
