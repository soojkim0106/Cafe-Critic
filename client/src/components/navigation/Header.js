import toast, { Toaster } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import "./header.css";




const Header = () => {
    const {user, logout, login} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout().then(() => {
          navigate('/login')
        })
    }

  return (
    <>
    <Toaster />
    <div className='navigation'>
      <nav className="navbar">
        <>
          {user ? (
            <div className="container">
                <NavLink to={"/cafes"}>Cafe ☕</NavLink><br></br>
              <NavLink to={'/profile'}>
                Profile
              </NavLink> <br></br>
              <NavLink to={'/reviews'}> All Reviews </NavLink> <br></br>
              <NavLink onClick={handleLogout}>Logout</NavLink>
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
