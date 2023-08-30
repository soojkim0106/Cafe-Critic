import { NavLink } from "react-router-dom";


function Nav({user, logout}){

    return (

        user !== null ? 
        <div>
            <h1>Naviation</h1>
            <NavLink to={"/"} exact>
                <span>Home</span>
            </NavLink>
            <NavLink to={'/books'} exact>
                <span>My Books</span>
            </NavLink>
            <NavLink to={'/brSignup'}>
                <span>Add books/recipes</span>
            </NavLink>
            <button onClick={logout}>Logout</button>
        </div> :
        <div>
            <h1>Navigation</h1>
            <NavLink to={"/"} exact>
                <span>Home</span>
            </NavLink>
            <NavLink to={'/signup'} exact>
                <span>Sign up</span>
            </NavLink>
            <NavLink to={'/signin'} exact>
                <span>Sign in</span>
            </NavLink>
        </div>
    )
}

export default Nav