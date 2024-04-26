import toast, { Toaster } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";


const Header = () => {
    const {user, logout, login} = useContext(UserContext)

  return (
    <>
    <Toaster />
    <div className='navigation'>
      <nav className="navbar">
        <>
          {user ? (
            <div className="container">
                <NavLink to={"/cafes"}>Cafe</NavLink><br></br>
              <NavLink to={'/profile'}>
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
