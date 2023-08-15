// import '../styling/Home.css'

function PlaceCard({city, state, country, image}){

    return (
        // <Card style={{border: '5px solid #614c33', borderRadius: '10px', backgroundColor: '#fffaed'}}>
            <div className="place-card">
                <div className="placecard-content">
                    <div className="placecard-image">
                        <img className='place-pic'src={image} alt={city} />
                    </div>
                    <div className="place-card-info">
                        <p className="place-card-title">Location:</p>
                        <p className="place-location">{city},{state}</p>
                        <p className="place-location">{country}</p>
                    </div>
                </div>
            </div>
        // </Card>
    )
}

export default PlaceCard