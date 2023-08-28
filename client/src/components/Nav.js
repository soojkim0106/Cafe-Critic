import { NavLink } from "react-router-dom";


function Nav(){

    return (
        <div>
            <h1>Navigation</h1>
            <NavLink to={"/"} exact>
                <span>Home</span>
            </NavLink>
            <NavLink to={'/books'} exact>
                <span>My Books</span>
            </NavLink>
            <NavLink to={'/signup'} exact>
                <span>Sign up</span>
            </NavLink>
        </div>
    )
}

export default Nav