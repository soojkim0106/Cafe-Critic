import React from "react";
import { useOutletContext } from "react-router-dom";
// import { useState } from "react";

function ClothingItemCard({ clothingObj }) {

  const [closetItems, setClosetItems] = useOutletContext()

  function addToCloset(clickedOnItem) {
    // I need to fetch (POST) this item to my Closets database.
    console.log(clickedOnItem)
    
    const OPTIONS = { 
      method : "POST",
      headers : { 
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(clickedOnItem)
    } 
    
    fetch('http://localhost:5555/closets', OPTIONS)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setClosetItems(closetItems => [...closetItems, clickedOnItem])
        console.log("please work")
    //   } else {
    //     console.error("failed to add item to closet")
      }
    })

  }
  
    return (
      <div>
        <h3>Clothing Item Card</h3>
        <div className="clothingitem-card">
          <div className="clothingitem-image">
            <img src={clothingObj.image_url} alt={clothingObj.name}></img>
          </div>
          <div className="clothingitem-details">
            <h3>{clothingObj.name}</h3>
            <h3>{clothingObj.category}</h3>
          </div>
          {}
          <div className="save-to-closet-btn">
            <button onClick={() => addToCloset(clothingObj)}>SAVE TO CLOSET</button>
          </div>
        </div>
      </div>
    );
  }
  
export default ClothingItemCard;