import React from "react";
import { Link } from "react-router-dom";
import CheckIn from "./CheckIn";

function Header(){
    return (
        <header>
            <h1 style={{fontSize: 50}}>
            The Gym
            </h1>
            <CheckIn></CheckIn>
            <h3 style={{fontSize: 17}}>Register / Sign Up</h3>
        </header>
    )
}

export default Header;