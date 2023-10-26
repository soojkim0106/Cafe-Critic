// import { useState } from "react";
// import { Link } from "react-router-dom";
import ClothingItemCard from "./ClothingItemCard";
import { useLoaderData, useOutletContext } from "react-router-dom";

function Closet() { 

  // const {closetItems} = useLoaderData()

  const [closetItems, setClosetItems] = useOutletContext()

  console.log(closetItems)

  const mappedClosetItems = closetItems.map(closetObj => (
    <ClothingItemCard 
      key={closetObj.id} 
      clothingObj={closetObj} /> ))

    return(
      <div>
            <div className="collection-header">
                
                <div className="categories-bar">
                    <button>tops</button>
                    <button>bottom</button>
                    <button>outerwear</button>
                    <button>footwear</button>
                </div>

                <div className="clothingitems-container">
                    {mappedClosetItems}
                </div>               
            </div>
        </div>
      
    ) 
}
export default Closet;