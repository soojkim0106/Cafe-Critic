import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const CommentCard = ({comment}) => {
  const { body } = comment;
  const { user, setUser } = useContext(UserContext);

  return (
    <>
    <div className="comment-body">
      <p>
        {body}
      </p>
      <p>
        by: to fix
      </p>
    </div>

    </>
  )
}

export default CommentCard