import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import CommentCard from "./CommentCard";
import { object, string, number } from "yup";
import { useFormik, Formik } from "formik";

const CommentContainer = ({reviewId}) => {
    const [comments, setComments] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const relatedComments = comments.filter(comment=>comment.review_id === reviewId)

    useEffect(() => {
        if (!user) {
          navigate("/registration");
        }
      }, [user, navigate])
    
      useEffect(() => {
        fetch("/comments")
          .then((resp) => {
            if (resp.ok) {
              return resp.json().then(setComments);
            }
            return resp.json().then((errorObj) => toast.error(errorObj.message));
          })
          .catch((err) => console.log(err));
      }, []);
    
      console.log(relatedComments)

  return (
    <div>
        <p><strong>Comments</strong>:</p>
        {relatedComments && relatedComments.map((comment) => (<CommentCard key={comment.id} comment={comment} comments={comments} setComments={setComments} user={user} />))}
    </div>
  )
}

export default CommentContainer