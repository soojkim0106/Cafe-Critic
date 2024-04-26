import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import toast from "react-hot-toast";
import ReviewCard from '../review/ReviewCard';
import UserContext from '../../context/UserContext';

const CafeDetail = () => {
    const location = useLocation();
    const { cafe } = location.state;
  
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const { setUser } = useContext(UserContext);
  
    useEffect(() => {
      fetch("/me").then((resp) => {
        if (resp.ok) {
          resp.json().then(setUser);
        } else {
          toast.error("Please log in!");
        }
      });
    }, [setUser]);
  
    useEffect(() => {
      if (!imageUrl) {
        fetch(`/images/${image}`)
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
    }, [image, imageLoaded, imageUrl]);
  
  
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