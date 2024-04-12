// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout'; // Import the Logout component

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/timelogs">Time Logs</Link>
        </li>
        {/* Include the Logout component */}
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
