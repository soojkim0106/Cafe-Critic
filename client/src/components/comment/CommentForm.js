import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { useFormik } from "formik";
import { UserContext } from "../../context/UserContext";
import './commentform.css'

export const CommentForm = ({reviewId}) => {

  const { user } = useContext(UserContext);
  const { id } = user;
  const navigate = useNavigate();

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
      navigate('/cafes')
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
    .then((resp) => {
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
        <form className ='comment-form' onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="body"
            placeholder="Comment"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          {formik.errors.body && formik.touched.body && (
            <div className='error-message show'>{formik.errors.body}</div>
          )}
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;