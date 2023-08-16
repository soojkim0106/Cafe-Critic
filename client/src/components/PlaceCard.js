import '../styling/home.css'

function PlaceCard({city, state, country, image}){

    return (
        <div className="place-card">
            <div className="placecard-content">
                <div className="placecard-image">
                    <img className='place-pic'src={image} alt={city} />
                </div>
                <div className="place-card-info">
                    {state ? <p className="place-location">{city}, {state}</p> : <p className="place-location">{city}</p>}
                    <p className="place-location">{country}</p>
                </div>
            </div>
        </div>
    )
}

export default PlaceCard