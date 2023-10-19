import React from "react";
import PetList from "./PetList";
import { NavLink } from "react-router-dom";
// import Search from "./Search";


function PetPage({xurl,pets,currUser,postFavorites,removeFavroite}) {


    return (
        <main>
            {/* <Search /> */}
            <PetList
                pets={pets} currUser={currUser} xurl={xurl} postFavorites={postFavorites} removeFavroite={removeFavroite}/>
        </main>
    )
}

export default PetPage;









