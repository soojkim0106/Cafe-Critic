import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login/Signup</NavLink>
            <NavLink to="/pets">Pets</NavLink>
        </div>
    )
}

export default NavBar;