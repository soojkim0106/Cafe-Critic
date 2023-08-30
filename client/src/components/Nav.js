import { NavLink } from "react-router-dom";


const Nav = ({ user, logout }) => {
    return (
        <div className="navigation-container">
            {user !== null ? (
                <div>
                    <h1>Navigation</h1>
                    <NavLink to={"/"} exact className="nav-link">
                        <span>Home</span>
                    </NavLink>
                    <NavLink to={'/books'} exact className="nav-link">
                        <span>My Books</span>
                    </NavLink>
                    <NavLink to={'/brSignup'} className="nav-link">
                        <span>Add books/recipes</span>
                    </NavLink>
                    <button onClick={logout} className="logout-button">Logout</button>
                </div>
            ) : (
                <div>
                    <h1>𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝓉𝑜 𝓎𝑜𝓊𝓇 𝓃𝑒𝓍𝓉 𝒽𝑜𝓂𝑒-𝒸𝑜𝑜𝓀𝑒𝒹 𝓂𝑒𝒶𝓁</h1>
                    <NavLink to={"/"} exact className="nav-link">
                        <span>Home</span>
                    </NavLink>
                    <NavLink to={'/signup'} exact className="nav-link">
                        <span>Sign up</span>
                    </NavLink>
                    <NavLink to={'/signin'} exact className="nav-link">
                        <span>Sign in</span>
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default Nav