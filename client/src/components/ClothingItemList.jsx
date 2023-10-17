import { React, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import ClothingItemCard from "./ClothingItemCard"
import Closet from "./Closet";

function ClothingItemList() {

    const [clothingitemState, setClothingItem] = useState([])

    const [closetItems, setClosetItems] = useState([]);


    function handleSaveToCloset(clothingItem) {
        setClosetItems((prevClosetItems) => [...prevClosetItems, clothingItem])
    }

    console.log(closetItems)


    useEffect(()=> {
        fetch('/collection')
        .then( response => response.json() )
        .then( clothingitemArray => setClothingItem(clothingitemArray) )
      },[])
      
      console.log(clothingitemState)

      const mappedClothingItems = clothingitemState.map(clothingObj => (<ClothingItemCard key={clothingObj.id} clothingObj={clothingObj} handleSaveToCloset={handleSaveToCloset}/>
      ))
      
      
    
    return(
        <div>
            <div>
                <Closet closetItems={closetItems}/>
                <ClothingItemCard handleSaveToCloset={handleSaveToCloset} />
            </div>
            <div className="collection-header">
                <img src="images/fashion-forecast-logo.jpg" alt="logo"></img>
                <div className="user-header">
                     {/* this is where it says "Hi, {username}" */}
                </div>

                <div className="nav-container-collection">
                    <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><Link to="/closet">Closet</Link></li>
                    </ul>
                    </nav>
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