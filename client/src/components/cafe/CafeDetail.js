import React from 'react'
import {useEffect, useState} from 'react'
import {Link, useLocation, useOutletContext } from 'react-router-dom'
import toast from "react-hot-toast";
import ReviewCard from '../review/ReviewCard';

const CafeDetail = () => {
    const location = useLocation();
    const { cafe } = location.state;
  
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const { user } = useOutletContext();
  
    useEffect(() => {
      fetch("/me").then((resp) => {
        if (resp.ok) {
          resp.json().then(user);
        } else {
          toast.error("Please log in!");
        }
      });
    }, [user]);
  
    useEffect(() => {
      if (!imageUrl)
        fetch(`/images/${image}`)
          .then((data) => {
            return data.blob();
          })
          .then((blob) => {
            // src.current = URL.createObjectURL(blob);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
            setImageLoaded(true);
          })
          .catch((error) => console.error("Error:", error));
      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }, [imageLoaded, imageUrl, image]);
  
  
    if(!cafe){
      return <h2>Loading...</h2>
    }

    const {name, address, image} = cafe;
  return (
    <div className='cafe-detail-container'>
        <h2>{name}</h2>
        {imageLoaded && imageUrl && <img src={imageUrl} alt={name} />}
        <div className='details'>
            <p>Address: {address}</p>
        </div>
        <div>
            Reviews:
            <ReviewCard/>
        </div>
    </div>
  )
}

export default CafeDetail