import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import ReviewCard from "./ReviewCard";

const ReviewContainer = () => {
    const [reviews, setReviews] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate("/registration");
        }
      }, [user, navigate])
    
      useEffect(() => {
        fetch("/reviews")
          .then((resp) => {
            if (resp.ok) {
              return resp.json().then(setReviews);
            }
            return resp.json().then((errorObj) => toast.error(errorObj.message));
          })
          .catch((err) => console.log(err));
      }, [setUser]);
      
  return (
    <div>
        {reviews && reviews.map((review) => (
            <ReviewCard key={review.id} review={review} reviews={reviews} setReviews={setReviews} user={user}/>
        ))}
    </div>
  )
}

export default ReviewContainer