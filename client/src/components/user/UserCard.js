import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import ReviewCard from "../review/ReviewCard";
import {Modal} from "react-bootstrap-modal";
import {Button} from 'react-bootstrap-buttons';

const UserCard = () => {
  const { user, updateCurrentUser, handleEditUser, handleDeleteUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [show, setShow] = useState(false);

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
            // .then((user) => {
            //   if (user.id !== userId) {
            //     navigate(`/users/${user.id}`);
            //   }
            // });
        } else {
          toast.error("Please log in");
          navigate("/registration");
        }
      });
    }
  }, [userId, user, navigate, updateCurrentUser]);

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
        <ReviewCard/>
      </div>
    </>
  );
};

export default UserCard;
