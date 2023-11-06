import React from "react";
import { useOutletContext } from "react-router-dom";

function ClothingItemCard({ clothingObj }) {
  const [closetItems, setClosetItems] = useOutletContext();

  function addToCloset(clickedOnItem) {
    // Your addToCloset function remains the same
    console.log(clickedOnItem);
    
    const OPTIONS = { 
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clickedOnItem)
    };

    fetch('http://localhost:5555/collection', OPTIONS)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setClosetItems(closetItems => [...closetItems, clickedOnItem]);
          console.log("Item added to closet successfully.");
        } else {
          console.error("Failed to add item to closet.");
        }
      });
  }

  return (
    <div>
      <div className="clothingitem-card">
        <div className="image-container">
          <img src={clothingObj.image_url} alt={clothingObj.name} />
        </div>
        <div className="clothingitem-details">
          <h3>ITEM NAME: {clothingObj.name}</h3>
          {/* <h3>category:{clothingObj.category}</h3> */}
        </div>
        <div className="save-to-closet-btn">
          <button onClick={() => addToCloset(clothingObj)}>save to closet</button>
        </div>
      </div>
    </div>
  );
}

export default ClothingItemCard;
