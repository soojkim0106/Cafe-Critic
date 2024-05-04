import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import { useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import CommentCard from "../comment/CommentCard";
import CommentContainer from "../comment/CommentContainer";
import CommentForm from "../comment/CommentForm";
import './reviewcard.css'
import * as Yup from 'yup'


const ReviewCard = ({ review }) => {
  const { id, body, star_rating, good_description, bad_description, username, cafe_id } = review;
  const { user, setUser } = useContext(UserContext);
  const {cafeId} = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const updateReview = Yup.object({
    body: Yup.string().required("Review body is required"),
    good_description: Yup.string().required("Good description is required"),
    bad_description: Yup.string().required("Bad description is required"),
    star_rating: Yup.number().required("Star rating is required"),
  });

  const initialValues = {
    body: review.body,
    good_description: review.good_description,
    bad_description: review.bad_description,
    star_rating: review.star_rating,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateReview,
    onSubmit: (formData) => {
      handleEditReview(formData);
      toast.success("Review updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
  });
  

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
        .then(
          toast.success("Review deleted successfully")
        )
        .then(
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        )
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        });
    }
  };

  const handleEditReview = (formData) => {
    fetch(`/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then((errorObj) => {
            toast.error(errorObj.message);
          });
        }
        return resp.json();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleNavigate =() => {
    navigate(`/cafes/${cafe_id}`)
  }

  return (
    <div className="review-body">
      {isEditMode ? (
        <form className='review-edit' onSubmit={formik.handleSubmit}>
          <>
            <label>Body</label>
            <input
              type="text"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              autoComplete="body"
              className="review-edit-input"
            />
            <label>Good Description</label>
            <input
              type="text"
              name="good_description"
              value={formik.values.good_description}
              onChange={formik.handleChange}
              autoComplete="good_description"
              className="review-edit-input"
            />
            <label>Bad Description</label>
            <input
              type="text"
              name="bad_description"
              value={formik.values.bad_description}
              onChange={formik.handleChange}
              autoComplete="bad_description"
              className="review-edit-input"
            />
            <label>Star Rating</label>

            <input
              type="text"
              name="star_rating"
              value={formik.values.star_rating}
              onChange={formik.handleChange}
              autoComplete="star_rating"
              className="review-edit-input"
            />
          </>
          <button className='edit-form-btn' type="submit">Save</button>
          <button className='edit-form-btn' type="button" onClick={() => setIsEditMode(false)}>
            {" "}
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Written by</strong>: {review.username}</p>
          <p><strong>Description</strong>: {body}</p>
          <p><strong>Tell me the good stuff</strong>: {good_description}</p>
          <p><strong>What was bad about it</strong>: {bad_description}</p>
          <p><strong>Star Rating (1~5)</strong>: {star_rating}</p>
          {location.pathname === "/profile" && (
            <>
              <button
                className="edit-button"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
              <button className="edit-button" onClick={handleDeleteReview}>
                Delete
              </button>
              <button className='back-to-cafe' onClick={handleNavigate}>Back to Cafe</button>
            </>
          )}
        </div>
      )}
      <div>
      {location.pathname === `/cafes/${cafeId}` && (
        <>
        <div className='review-card-comments'> <br></br>
        <button className='show-comment' onClick={handleToggleComments}>{showComments ? "Hide Comments" : "Show Comments"}</button><br></br>
        </div>
        {showComments && <CommentContainer reviewId={review.id}/>}<br></br>
        <CommentForm reviewId={review.id}/>
        </>
      )}
      </div>
      <div>
      {location.pathname === `/reviews` && (
        <button className='back-to-cafe' onClick={handleNavigate}>Back to Cafe</button>
      )}
      </div>
    </div>
  );
};

export default ReviewCard;
