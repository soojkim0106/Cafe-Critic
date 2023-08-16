import { React, useState, useEffect }from "react"
import PlaceCard from "./PlaceCard"
import '../styling/home.css'

function Home(){
    const [places, setPlaces] = useState([])
    const [search, setSearch] = useState(''); // State for search query

useEffect(() => {
    fetch('http://127.0.0.1:5555/places')
    .then(r => r.json())
    .then(data => setPlaces(data))
},[])

useEffect(() => {
    document.title="Traveler's Club | Home"
}, [])

const filteredPlaces = places.filter(place => place.city && place.city.toLowerCase().includes(search.toLowerCase()))
.map(filteredPlaces => (
    <PlaceCard
        key={filteredPlaces.id}
        city={filteredPlaces.city}
        state={filteredPlaces.state}
        country={filteredPlaces.country}
        image={filteredPlaces.image}
    />
));

    return(
        <div className="place-list">
            <h1 className="place-list-header">Destinations</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    icon="search"
                    placeholder="Search destinations . . ."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="card">
                {filteredPlaces}
                {/* {console.log(filteredPlaces)} */}
            </div>
        </div>
    )
}

export default Home

// display: grid;
//   /* puts in grid notation. Starts a new row after every 5. 1fr = spacing*/
//   grid-template-columns: repeat(6, 1fr);