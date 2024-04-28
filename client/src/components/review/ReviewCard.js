import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const ReviewCard = ({ review, setReviews, reviews }) => {
  const { id, body, star_rating, good_description, bad_description } = review;
  const { user, setUser } = useContext(UserContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/registration");
    }
  }, [user, navigate]);

  const handleDeleteReview = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your review?"
    );
    if (confirmDelete) {
      fetch(`/reviews/${id}`, {
        method: "DELETE",
      })
        .then((resp) => {
          if (!resp.ok) {
            return resp.json().then((errorObj) => {
              toast.error(errorObj.message);
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="review-body">
      <p>{body}</p>
      <p>Pro: {good_description}</p>
      <p>Con: {bad_description}</p>
      <p>Star Rating (1~5): {star_rating}</p>
      {location.pathname === '/profile' && (
        <>
          <button className="edit-button" onClick={() => setIsEditMode(true)}>
            Edit
          </button>
          <button className="edit-button" onClick={handleDeleteReview}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ReviewCard;
