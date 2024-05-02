import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import toast from "react-hot-toast";
import ReviewCard from '../review/ReviewCard';
import ReviewForm from '../review/ReviewForm';
import ReviewContainer from '../review/ReviewContainer';
import './cafedetail.css'

const CafeDetail = () => {
    const [cafe, setCafe] = useState();
    const {cafeId} = useParams();
    const [error, setError] = useState(null)

    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [reviewList, setReviewList] = useState([]);

    

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
      if (cafe) {
        fetch(`/cafes/${cafe.id}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Failed to fetch user data");
            }
          })
          .then((cafeData) => {
            if (cafeData.reviews && Array.isArray(cafeData.reviews)) {
              const reviewId = cafeData.reviews.map((review) => {
                return review.id;
              });
              Promise.all(
                reviewId.map((reviewId) =>
                  fetch(`/reviews/${reviewId}`).then((resp) => resp.json())
                )
              )
                .then((reviewData) => {
                  setReviewList(reviewData);
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              console.error(
                "cafeData.review is not an array or is undefined"
              );
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [cafe]);

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
      <div className='review-form-container'>
        <ReviewForm cafeId={cafe.id}/>
        </div>
        <h2>{name}</h2>
        {imageLoaded && imageUrl && <img src={imageUrl} alt={name} />}
        <div className='details'>
            <p>Address: {address}</p>
        </div>
        <div>
        <div className='review-container'>
            {reviewList.map((review) => (
          <ReviewCard review={review} key={review.id}></ReviewCard>
        ))}
        </div>

        </div>
    </div>
  )
}

export default CafeDetail