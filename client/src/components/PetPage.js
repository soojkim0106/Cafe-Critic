import React, { useEffect, useState } from "react";
import PlantList from "./PetList";
import Search from "./Search";


function PetPage() {

    const xurl = "http://localhost:5555"
    const [pets, setPets] = useState([])

    useEffect(() => {
        fetch(xurl + '/pets')
            .then(r => r.json())
            .then(setPets)
    }, [])





    return (
        <main>
            <Search />
            <PetList
                pets={pets} />
        </main>
    )
}

export default PetPage;









