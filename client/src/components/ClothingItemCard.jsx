import React from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

function ClothingItemCard({ clothingObj }) {
    
  // const navigate = useNavigate()
  const [closetItems, setClosetItems] = useOutletContext()

  function addToCloset(clothingitem) {
    // I need to fetch (POST) this item to my Closets database.
    setClosetItems(closetItems => [...closetItems, clothingitem])
    // navigate("/closet")
  }

  // function removeFromCloset(closetItem) {
  //   // remove the item from the closet
  // }

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