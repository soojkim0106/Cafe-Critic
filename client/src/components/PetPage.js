import React, { useEffect, useState } from "react";
import PetList from "./PetList";
// import Search from "./Search";


function PetPage() {

    const xurl = "http://localhost:4000"
    const [pets, setPets] = useState([])

    useEffect(() => {
        fetch(`${xurl}/pets`)
            .then(r => r.json())
            .then(setPets)
            console.log(pets)
    }, [])


    return (
        <main>
            {/* <Search /> */}
            <PetList
                pets={pets} />
        </main>
    )
}

export default PetPage;









