import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { useFormik } from "formik";
import { UserContext } from "../../context/UserContext";
import ReviewCard from "../review/ReviewCard";
import "./usercard.css";

const UserCard = () => {
  const { user, updateCurrentUser, handleEditUser, handleDeleteUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewList, setReviewList] = useState([]);


  const updateProfileSchema = object({
    username: string()
      .max(20, "Username must be max of 20 characters")
      .required(),
    email: string().email().required(),
    current_password: string().required("Please enter your current password"),
  });

  useEffect(() => {
    if (!user) {
      fetch("/me").then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            updateCurrentUser(user);
            return user;
          });
        } else {
          toast.error("Please log in");
          navigate("/registration");
        }
      });
    }
  }, [userId, user, navigate, updateCurrentUser]);

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((userData) => {
          if (userData.reviews && Array.isArray(userData.reviews)) {
            const reviewId = userData.reviews.map((review) => {
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
            console.error("userData.review is not an array or is undefined");
          }
        });
    }
  }, [user]);

  const initialValues = {
    username: user?.username,
    email: user?.email,
    current_password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit: (formData) => {
      handleEditUser(formData).then(() => {
        toast.success("Profile updated successfully");
      })
    },
  });

  if (!user) {
    return <p>You must log in first</p>;
  }

  return (
    <>
      <div className="user-profile" key={user.id}>
        {isEditMode ? (
          <form className="user-edit-profile" onSubmit={formik.handleSubmit}>
            <>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                autoComplete="username"
                className="user-edit-profile-input"
              />
              {formik.errors.username && formik.touched.username && (
                <div className="error-message show">
                  {formik.errors.username}
                </div>
              )}
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete="email"
                className="user-edit-profile-input"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="error-message show">{formik.errors.email}</div>
              )}
            </>
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Required"
              name="current_password"
              value={formik.values.current_password}
              onChange={formik.handleChange}
              autoComplete="current-password"
              className="user-edit-profile-input"
            />
            {formik.errors.current_password &&
              formik.touched.current_password && (
                <div className="error-message show">
                  {formik.errors.current_password}
                </div>
              )}
            <button className="edit-form-btn" type="submit">
              Save
            </button>
            <button
              className="edit-form-btn"
              type="button"
              onClick={() => setIsEditMode(false)}
            >
              {" "}
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <h1>Profile</h1>
            <p>
              <span className="label">Username: </span>
              <span className="value">{user.username}</span>
            </p>
            <p>
              <span className="label">Email: </span>
              <span className="value">{user.email}</span>
            </p>
            <div className="button-group">
              <button
                className="edit-button"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
              <button className="edit-button" onClick={handleDeleteUser}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="review-container">
        <h1>Reviews</h1>
        {reviewList.map((review) => (
          <ReviewCard review={review} key={review.id}></ReviewCard>
        ))}
      </div>
    </>
  );
};

export default UserCard;
