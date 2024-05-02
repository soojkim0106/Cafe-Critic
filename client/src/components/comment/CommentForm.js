import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import { useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";

export const CommentForm = ({reviewId}) => {

  const { user, setUser } = useContext(UserContext);
  const { id } = user;

  const postComment = object({
    body: string().required("Comment body is required"),
  });

  const initialValues = {
    body: "",
    user_id: id,
    review_id: reviewId,
    username: user.username,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: postComment,
    onSubmit: (formData) => {
      handlePostComment(formData);
      toast.success("Comment posted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
  });

  const handlePostComment = (formData) => {
    fetch('/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: formData.body,
        user_id: user.id,
        review_id: Number.parseInt(reviewId),
        username: user.username,
      }),
    })
    .then((resp) => { {debugger}
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Failed to submit form");
      }
    })
    .catch((error) => {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    });
};

  return (
    <div>
      <div className="comment-post-body">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="body"
            placeholder="Comment"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;