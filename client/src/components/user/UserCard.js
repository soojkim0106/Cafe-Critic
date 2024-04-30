import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import {Modal} from "react-bootstrap-modal";
import {Button} from 'react-bootstrap-buttons';
import ReviewCard from "../review/ReviewCard";
import CommentCard from "../comment/CommentCard";

const UserCard = () => {
  const { user, updateCurrentUser, handleEditUser, handleDeleteUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateProfileSchema = object({
    username: string().max(20, "Username must be max of 20 characters").required(),
    email: string().email().required(),
    current_password: string().required("Please enter your current password"),
  });

  useEffect(() => {
    if (!user) {
      fetch("/me").then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then((user) => {
              updateCurrentUser(user);
              return user;
            })
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
            console.error(
              "userData.review is not an array or is undefined"
            );
          }
        })
        .then((userData) => {
          if (userData.comments && Array.isArray(userData.comments)) {
            const commentId = userData.comments.map((comment) => {
              return comment.id;
            });
            Promise.all(
              commentId.map((commentId) =>
                fetch(`/comments/${commentId}`).then((resp) => resp.json())
              )
            )
              .then((commentData) => {
                setReviewList(commentData);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.error(
              "userData.comment is not an array or is undefined"
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);


  const initialValues = {
    username: '',
    email: '',
    current_password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit: (formData) => {
      handleEditUser(formData);
      toast.success("Profile updated successfully");
      window.location.reload();
    },
  });

  if (!user) {
    return <p>You must log in first</p>;
  }

  return (
    <>
      <div className="user-profile" key={user.id}>
        {isEditMode ? 
                   <form onSubmit={formik.handleSubmit}>
                       <>
                         <label>Username</label>
                         <input
                           type="text"
                           name="username"
                           value={formik.values.username}
                           onChange={formik.handleChange}
                           autoComplete="username"
                         />
                         <label>Email</label>
                         <input
                           type="text"
                           name="email"
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           autoComplete="email"
                         />
                       </>
                     <label>Current Password</label>
                     <input
                       type="password"
                       placeholder="Required"
                       name="current_password"
                       value={formik.values.current_password}
                       onChange={formik.handleChange}
                       autoComplete="current-password"
                     />
                     <button type="submit">Save</button>
                     <button type="button" onClick={() => setIsEditMode(false)}> Cancel
                     </button>
                   </form>
                  : 
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
                   </div>}
      </div>
      <div>
        <h1>Reviews</h1>
        {reviewList.map((review) => (
          <ReviewCard review={review} key={review.id}></ReviewCard>
        ))}
      </div>
      {/* <div>
        <h1>Comments</h1>
        {commentList.map((comment) => (
          <CommentCard comment={comment} key={comment.id}></CommentCard>
        ))}
      </div> */}
    </>
  );
};

export default UserCard;
