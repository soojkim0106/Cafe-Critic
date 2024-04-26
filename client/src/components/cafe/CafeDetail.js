import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import toast from "react-hot-toast";
import ReviewCard from '../review/ReviewCard';
import ReviewForm from '../review/ReviewForm';

const CafeDetail = () => {
    const [cafe, setCafe] = useState();
    const {cafeId} = useParams();
    const [error, setError] = useState(null)

    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    

    useEffect(()=>{
      fetch(`/cafes/${cafeId}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json().then(setCafe)
        }
        return resp.json().then(errorObj => setError(errorObj.message))
      })
      .catch(error => console.error(error))
    }, [cafeId])

  
    useEffect(() => {
      if (!imageUrl && cafe?.image) {
        fetch(`/images/${cafe.image}`)
          .then((data) => {
            return data.blob();
          })
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
            setImageLoaded(true);
          })
          .catch((error) => console.error("Error:", error));
      }
      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }, [cafe?.image, imageUrl]);
  
    if (error) {
      return <h2>{error}</h2>
    }
    if(!cafe){
      return <h2>Loading...</h2>
    }

    const {name, address} = cafe;

  return (
    <div className='cafe-detail-container'>
        <h2>{name}</h2>
        {imageLoaded && imageUrl && <img src={imageUrl} alt={name} />}
        <div className='details'>
            <p>Address: {address}</p>
        </div>
        <div>
            Reviews:
            <ReviewForm/>
            <ReviewCard/>
        </div>
    </div>
  )
}

export default CafeDetail