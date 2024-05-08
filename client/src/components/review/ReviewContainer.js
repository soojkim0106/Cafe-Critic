import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import ReviewCard from "./ReviewCard";
import './reviewcontainer.css'
import SearchBar from "../navigation/SearchBar";

const ReviewContainer = () => {
    const [reviews, setReviews] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredUser = reviews.filter((review) => review.username.toLowerCase().includes(searchQuery.toLowerCase()))

    // useEffect(() => {
    //     if (!user) {
    //       navigate("/review");
    //     }
    //   }, [user, navigate])
    
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
    <div className="review-box">
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery}/>
        {reviews && filteredUser.map((review) => (
            <ReviewCard key={review.id} review={review} reviews={reviews} setReviews={setReviews} user={user}/>
        ))}
    </div>
  )
}

export default ReviewContainer