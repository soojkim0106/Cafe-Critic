import React from "react";
import PlantCard from "./PetCard";

function PetList({ pets }) {
    const renderPets = pets.map((pet) => {
        return <PetCard key={pet.id} pet={pet} />
    })

    return (

        <ul className="cards">{renderPets}</ul>

    )
}

export default PetList;