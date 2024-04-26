import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import ReviewCard from "../review/ReviewCard";

const UserCard = () => {
  const { user, updateCurrentUser, handleEditUser, handleDeleteUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const updateProfileSchema = object({
    username: string().max(20, "Username must be max of 20 characters"),
    email: string().email(),
    current_password: string().required("Please enter your current password"),
    new_password: string(),
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
            .then((user) => {
              if (user.id !== userId) {
                navigate(`/users/${user.id}`);
              }
            });
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
    new_password: '',
    current_password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit: (formData) => {
      if(showChangePassword && !formData.new_password){
        toast.error("Please enter a new password");
        return;
      }
      handleEditUser(formData);
    },
  });

  if (!user) {
    return <p>You must log in first</p>;
  }

  return (
    <>
      <div className="user-profile" key={user.id}>
        {!isEditMode ? (
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
        ) : (
          <form onSubmit={formik.handleSubmit}>
            {!showChangePassword && (
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
            )}
            {showChangePassword && (
              <>
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  name="new_password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  autoComplete="new-password"
                />
              </>
            )}
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Current Password Required"
              name="current_password"
              value={formik.values.current_password}
              onChange={formik.handleChange}
              autoComplete="current-password"
            />
            <button type="submit">Save</button>
            {showChangePassword ? null : (
              <button type="button" onClick={() => setIsEditMode(false)}>
                {" "}
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              {showChangePassword ? "Cancel" : "Change Password"}
            </button>
          </form>
        )}
        <Toaster />
      </div>
      <div>
        <h1>Reviews</h1>
        <ReviewCard />
      </div>
    </>
  );
};

export default UserCard;
