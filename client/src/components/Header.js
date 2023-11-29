import React from "react";
import { Link } from "react-router-dom";
import CheckIn from "./CheckIn";

function Header(){
    return (
        <header>
            <h1>
            The Gym
            </h1>
            <CheckIn></CheckIn>
            <h3>Sign In</h3>
            <h3>Register / Sign Up</h3>
            <h3>Sign Out</h3>
        </header>
    )
}

export default Header;