// NavBar.js
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <img className="app-logo" 
                src="images/fashion-forecast-logo.jpg" 
                alt="logo" />

            <header className='navigation-bar'>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/collection" className="nav-link">Collection</Link>
                    <Link to="/closet" className="nav-link">Closet</Link>
                </nav>
            </header>
        </div>
    );
}

export default NavBar;
