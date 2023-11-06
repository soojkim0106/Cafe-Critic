import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <header className='main-header'>
                <nav className='navBar'>
                    
                    <div className="logo-container">
                        <h2>LOGO GOES HERE</h2>
                        {/* <img className="app-logo" 
                            src="images/fashion-forecast-logo.jpg" 
                            alt="logo" /> */}
                    </div>

                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/collection" className="nav-link">Collection</Link>
                        <Link to="/closet" className="nav-link">Closet</Link>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default NavBar;
