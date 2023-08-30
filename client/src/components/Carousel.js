import React from 'react';
import './carouselStyles.css';

function Carousel({ books, prev, current, next, loadBook, prevBook, nextBook }) {
  return (
    <div className="carousel-container">
      <div className="book-wrapper">
        {books[prev] && (
          <div className="book-content">
            <h2 className="book-title">{books[prev].category}</h2>
          </div>
        )}
        {books[current] && (
          <div className="book-content" onClick={() => loadBook(books[current])}>
            <h2 className="book-title">{books[current].category}</h2>
          </div>
        )}
        {books[next] && (
          <div className="book-content">
            <h2 className="book-title">{books[next].category}</h2>
          </div>
        )}
      </div>
      <div className="nav-buttons">
        <button className="nav-button" onClick={prevBook}>
          {'\u276c'}
        </button>
        <button className="nav-button" onClick={nextBook}>
          {'\u276d'}
        </button>
      </div>
    </div>
  );
}

export default Carousel;