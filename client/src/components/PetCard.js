import React, { useState } from "react";

function PetCard({ pet }) {
    const { name, breed, image, type } = pet
    const [inFavorite, setInFavorite] = useState(true)
    return (
        <li className="card">
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>Type: {type}</p>
            <p>Breed: {breed}</p>
            {inFavorite ? (
                <button onClick={() => { setInFavorite(false) }} className="primary"> Favorite </button>
            ) : (
                <>
                    <button onClick={() => { setInFavorite(true) }} > Unfavorited </button>
                    <button >ADOPT</button>

                </>
            )}
        </li>
    );
}

export default PetCard;
