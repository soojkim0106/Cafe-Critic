import React from "react";
import { useOutletContext } from "react-router-dom";

function ClothingItemCard({ clothingObj, closetObj }) {

  const [closetItems, setClosetItems] = useOutletContext([]);

  console.log(clothingObj)
  
  function addToCloset(clickedOnItem) {
  
    console.log(clickedOnItem.id);
    
  

    const OPTIONS = { 
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: 3, item_id: clickedOnItem.id})
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


  function removeFromCloset(clothingObj) {
    const user_id = 3;
    const item_id = closetObj.id


    const OPTIONS = {
      method: "DELETE"
    }

    fetch(`http://localhost:5555/collection/${closetObj.id}`, OPTIONS)
    .then(res => res.json())
    .then(res => {
      if (res.message) {
        setClosetItems(closetItems => closetItems.filter(item => item.id !== item_id))
        console.log("Item removed from closet successfully.");
      } else {
        console.error("Failed to remove item from closet.");
    }
    })
  }



  return (
    <div>
      <div className="clothingitem-card">
        <div className="image-container">
          <img
            className="clothing-image"
            src={clothingObj.image_url}
            alt={clothingObj.name}
            width="200"
            height="200"
          />
        </div>
        <div className="clothingitem-details">
          <h3>{clothingObj.name}</h3>
          {/* <h3>category:{clothingObj.category}</h3> */}
        </div>
        <div className="save-to-closet-btn">
          <button onClick={() => addToCloset(clothingObj)}>save to closet</button>
          <button onClick={() => removeFromCloset(closetObj)}>Remove from Closet</button>
        </div>
      </div>
    </div>
  );  
}

export default ClothingItemCard;
