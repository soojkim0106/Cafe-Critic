import { NavLink } from "react-router-dom";
import '../styling/navbar.css';
import { useContext } from "react";
import { UserContext } from "../context/user";
// import mytrails from '../myTrails.png'

function NavBar( {navigate} ) {    

    const {user, setUser} = useContext(UserContext)

    const handleLogout = () => {
    fetch("/logout",{
      method: "DELETE"
    })
      .then( r => {
        if (r.ok) {
          setUser(null)
        //   window.location.href = '/'
          navigate('/')
        }
      })
    }
    console.log(user)
    return (
        <div className="header">
            <div className="left-side-nav">
                {/* <img className="my-trails" src={mytrails} alt='My Trails' height={75}/> */}
                <p>LOGO</p>
            </div>
            <div className="center-nav">
                {user ? <><p className="hello">Welcome, {user.username}</p><img className="current-user-img" src={user.profile_image} alt={user.username}/></> : null}
            </div>
            <div className="nav-bar">
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="home">Home</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="List">Packing List</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="social">Social</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="trips">My Trips</NavLink></li>
                <li className="nav-bar-list"><button className="nav-bar-link" onClick={handleLogout}>Logout</button></li>
            </div>
        </div>

    )
}

export default NavBar