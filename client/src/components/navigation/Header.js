import { Toaster } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./header.css";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <Toaster />
      <div className="navigation">
        <div>

        </div>
        <nav className="navbar">
          <>
          <div className="title">
            <h1><NavLink to={"/cafe"}>Cafe Critic ☕</NavLink></h1>
          </div>
            {user ? (
              <div className="container">
                <NavLink to={"/cafe"}>Cafe List</NavLink>
                <br></br>
                <NavLink to={"/review"}> All Reviews </NavLink> <br></br>
                <NavLink to={"/profile"}>Profile</NavLink> <br></br>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </div>
            ) : (
              <Link to={"/registration"}>Login / Sign up</Link>
            )}
          </>
        </nav>
      </div>
    </>
  );
};

export default Header;
