import React, { useState } from 'react';
import './index.css'; // Make sure to import your CSS file

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ];

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel">
      <div className="carousel-container" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-nav">
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;
