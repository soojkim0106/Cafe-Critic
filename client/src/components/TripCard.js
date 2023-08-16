function TripCard({id, placeCity, placeState, placeCountry, placeImage, rating, comments, favorite, handleFavorite, removeTripCard}){

    function handleDelete(){
        fetch(`/trips/${id}`,
        {method: "DELETE",})
        .then(() => removeTripCard(id))
        
    }

    return (
        <div className="trip-card">
            <div className="tripcard-content">
                <div className="trip-card-info">
                    <img className='trip-pic'src={placeImage} alt={placeCity} />
                    {placeState ? <p className="trip-location">{placeCity}, {placeState}<button className='heart'onClick={(e) => handleFavorite(id,!favorite)}>{favorite ? "❤️" : "🖤"}</button></p> : <p className="trip-location">{placeCity}<button className='heart'onClick={(e) => handleFavorite(id,!favorite)}>{favorite ? "❤️" : "🖤"}</button></p>}
                    <p className="trip-location">{placeCountry}</p>
                    <p className="trip-card-title">My Rating:</p>
                    <p className='trip-rating'> {'⭐️'.repeat(rating)}</p>
                    <p className="trip-comments">"{comments}"</p>
                    <button className='trip-delete-button' onClick={handleDelete}>🗑</button>
                </div>
            </div>
        </div>
    )

}

export default TripCard