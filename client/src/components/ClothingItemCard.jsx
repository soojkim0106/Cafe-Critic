import React from "react";

function ClothingItemCard({ clothingObj, handleSaveToCloset }) {
    
    if (!clothingObj || !clothingObj.name) {
      return <div>No data available</div>;
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
          <div className="save-to-closet-btn">
            <button onClick={() => handleSaveToCloset(clothingObj)}>SAVE TO CLOSET</button>
          </div>
        </div>
      </div>
    );
  }
  
export default ClothingItemCard;