import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="content">
        <h4>#1 Hourly Employee Tracking</h4>
        <h3>Employee Time-Tracking</h3>
        <h1>
          Our Basic Plan Is Free, Forever!<br />
          (No Credit Card Required)
        </h1>
        <Link to="/signup" className="button">Use it for free</Link>
      </div>
      <div className="image-container">
        <img
          src="https://res.cloudinary.com/doyp4tk82/image/upload/v1711896108/Blue_Modern_Simple_Testimonial_Review_Facebook_Post_tqotxy.png"
          alt=""
          className="image"
        />
      </div>
    </div>
  );
}

export default Home;
