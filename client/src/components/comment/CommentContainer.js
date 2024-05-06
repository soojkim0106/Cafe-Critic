import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import CommentCard from "./CommentCard";
import './commentcontainer.css'

const CommentContainer = ({reviewId}) => {
    const [comments, setComments] = useState([]);
    const { user } = useContext(UserContext);
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
    <div className='comment-container'>
        <p><strong>Comments</strong>:</p>
        {relatedComments && relatedComments.map((comment) => (<CommentCard key={comment.id} comment={comment} comments={comments} setComments={setComments} user={user} />))}
    </div>
  )
}

export default CommentContainer