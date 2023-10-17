import {Link} from 'react-router-dom'

function NavBar() {
    return(
       <header className='navigation-bar'>
        <nav>
            <Link to = "/">Home</Link>
            <Link to = "/collection">Collection</Link>
            <Link to = "/closet">Closet</Link>
        </nav>

       </header>
    )
}

export default NavBar;