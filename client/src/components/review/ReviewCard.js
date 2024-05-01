import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import { useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import CommentCard from "../comment/CommentCard";
import CommentContainer from "../comment/CommentContainer";
import CommentForm from "../comment/CommentForm";

const ReviewCard = ({ review }) => {
  const { id, body, star_rating, good_description, bad_description, username } = review;
  const { user, setUser } = useContext(UserContext);
  const {cafeId} = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const updateReview = object({
    body: string().required("Review body is required"),
    good_description: string().required("Good description is required"),
    bad_description: string().required("Bad description is required"),
    star_rating: number().required("Star rating is required"),
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
      window.location.reload();
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
          toast.success("Review deleted successfully"),
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

  return (
    <div className="review-body">
      {isEditMode ? (
        <form onSubmit={formik.handleSubmit}>
          <>
            <label>Body</label>
            <input
              type="text"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              autoComplete="body"
            />
            <label>Good Description</label>
            <input
              type="text"
              name="good_description"
              value={formik.values.good_description}
              onChange={formik.handleChange}
              autoComplete="good_description"
            />
            <label>Bad Description</label>
            <input
              type="text"
              name="bad_description"
              value={formik.values.bad_description}
              onChange={formik.handleChange}
              autoComplete="bad_description"
            />
            <label>Star Rating</label>

            <input
              type="text"
              name="star_rating"
              value={formik.values.star_rating}
              onChange={formik.handleChange}
              autoComplete="star_rating"
            />
          </>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditMode(false)}>
            {" "}
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Written by: {username}</p>
          <p>Description: {body}</p>
          <p>Tell me the good stuff: {good_description}</p>
          <p>What was bad about it: {bad_description}</p>
          <p>Star Rating (1~5): {star_rating}</p>
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
            </>
          )}
        </div>
      )}
      <div>
      {location.pathname === `/cafes/${cafeId}` && (
        <>
        <CommentForm reviewId={review.id}/>
        <h4>Comments:</h4>
        <button onClick={handleToggleComments}>{showComments ? "Hide Comments" : "Show Comments"}</button>
        {showComments && <CommentContainer/>}
        </>
      )}
      </div>
    </div>
  );
};

export default ReviewCard;
