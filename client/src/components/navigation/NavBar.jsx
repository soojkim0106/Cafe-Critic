import { NavLink } from "react-router-dom";
import { Toaster } from 'react-hot-toast'


function NavBar() {
  return (
    <>
    <Toaster />
    <nav className="navbar">
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/users/:userId'>Profile</NavLink>
      <NavLink to='/registration'>Sign Up/Login</NavLink>
      <NavLink to='/cats'>Adopt/Foster</NavLink>
    </nav>
    </>
  );
};

export default NavBar