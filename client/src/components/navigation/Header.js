import toast, { Toaster } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";


const Header = () => {
    const {user, logout} = useContext(UserContext)
  return (
    <>
    <Toaster />
    <div className='navigation'>
      <nav className="navbar">

        <NavLink to='/'>Cafe Critic</NavLink> <br></br>
        <>
          {user ? (
            <div className="container">
              <NavLink to={`/users/${user.id}`}>
                Profile
              </NavLink> <br></br>
              <NavLink onClick={logout}>Logout</NavLink>
            </div> 
          ) : (
            <Link to={"/registration"}>
              Login / Sign up
            </Link>
          )}
        </>
      </nav>
    </div>
    </>
  );
};

export default Header;
