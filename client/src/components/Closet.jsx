// import { useState } from "react";
import { Link } from "react-router-dom";

function Closet({closetItems}) { 


    return(

        <div>
           <div className="nav-container-collection">
                    <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><Link to="/closet">Closet</Link></li>
                    </ul>
                    </nav>
                </div>

                <div>
                    {closetItems.map((item) => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                        </div>
                    ))}
                </div>
        </div>
      
    ) 
}
export default Closet;