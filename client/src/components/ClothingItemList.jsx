// ClothingItemList.js
import React from "react";
import ClothingItemCard from "./ClothingItemCard";
import { useLoaderData } from "react-router-dom";

function ClothingItemList() {
    
    const { clothingItems } = useLoaderData();

    const mappedClothingItems = clothingItems.map(clothingObj => (
        <ClothingItemCard key={clothingObj.id} clothingObj={clothingObj} />
    ));

    return (
        <div className="collection-header">
            <div className="content-container">
                <div className="categories-bar">
                    <button>tops</button>
                    <button>bottoms</button>
                    <button>outerwear</button>
                    <button>footwear</button>
                </div>

                <div className="clothingitems-container">
                    {mappedClothingItems}
                </div>
            </div>
        </div>
    );
}

export default ClothingItemList;
