import { useEffect, useState, useContext } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";
import UserProvider from "../../context/UserContext";

const UserCard = () => {
    const { user, updateCurrentUser, handleEditUser } = useContext(UserProvider)
    const navigate = useNavigate()
    const { userId } = useParams()

    const updateProfileSchema = object({
        username: string().max(20, "Username must be max of 20 characters"),
        email: string().email(),
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
    email: "",
    username: "",
    };
    
    const formik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit: (formData) => {
        handleEditUser(formData);
    },
    });
    
    if (!user) {
    return <p>You must log in first</p>;
    }

    // const { username, email, password_hash } = user;
  return (
    <div>UserCard</div>
  )
}

export default UserCard