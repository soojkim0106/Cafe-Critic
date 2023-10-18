import { React } from "react";
import ClothingItemCard from "./ClothingItemCard"
import { useLoaderData } from "react-router-dom";

function ClothingItemList() {

  const {clothingItems} = useLoaderData()

      const mappedClothingItems = clothingItems.map(clothingObj => (
      <ClothingItemCard 
        key={clothingObj.id} 
        clothingObj={clothingObj} />
      ))

    return(
        <div>
            {/* <div>
                <Closet closetItems={closetItems} />
            </div> */}
            <div className="collection-header">
                <img src="images/fashion-forecast-logo.jpg" alt="logo"></img>
                <div className="user-header">
                     {/* this is where it says "Hi, {username}" */}
                </div>
                <div className="categories-bar">
                    <button>tops</button>
                    <button>bottom</button>
                    <button>outerwear</button>
                    <button>footwear</button>
                </div>

                <div className="clothingitems-container">
                    {mappedClothingItems}
                </div>               
            </div>
        </div>
    )
}
export default ClothingItemList;