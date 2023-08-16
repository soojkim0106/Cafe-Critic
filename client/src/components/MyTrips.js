import TripCard from "./TripCard"
import TripForm from "./TripForm"
import React, { useState, useEffect, useContext } from "react"
import '../styling/mytrips.css'
import { UserContext } from "../context/user"

function MyTrips(){

    const {user} = useContext(UserContext)

    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch('/trips')
            .then(r => r.json())
            .then(data => setTrips(data))
    }, [])

    const addNewTrip = (newTrip) => {
        setTrips([...trips, newTrip])
    }

    const handleFavorite = (tripId, updatedVal) => {
        fetch(`trips/${tripId}` ,{
            method: 'PATCH',
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({favorite: updatedVal})
        })
            .then(r => r.json())
            .then(updatedTrip => setTrips(trips.map(trip => {
                if (trip.id !== tripId){
                    return trip
                }
                else {
                    return updatedTrip
                }
            })))
    }

    useEffect(() => {
        document.title="Traveler's Club"
    }, [])

    const removeTripCard = (id) => {
        setTrips((currentTrips) => 
            currentTrips.filter((trip) => trip.id !== id)
        )
    }

    const [search, setSearch] = useState('')

    const filteredTrip = trips.filter(trip => trip.user_id === user?.id).filter(trip => trip.place && trip.place.city.toLowerCase().includes(search.toLowerCase())).map(filteredTrip => (
        <TripCard
            key={filteredTrip.id}
            id={filteredTrip.id}
            placeCity={filteredTrip.place.city}
            placeState={filteredTrip.place.state}
            placeCountry={filteredTrip.place.country}
            placeImage={filteredTrip.place.image}
            rating={filteredTrip.rating}
            comments={filteredTrip.comments}
            favorite={filteredTrip.favorite}
            handleFavorite={handleFavorite}
            removeTripCard={removeTripCard}
        />
    ))
    
    return (
        <div className='trip-page'>
            <div className='trip-list'>
            <h1 className="trip-header">My Trips</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    icon="search"
                    placeholder="Search your trips . . ."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="card">
                {filteredTrip}
            </div>
            </div>
            <div className='trip-form'>
                <h1 className="trip-header">Add a Trip!</h1>
                <TripForm user={user} addNewTrip={addNewTrip}/>
            </div>
        </div>
    )
}

export default MyTrips