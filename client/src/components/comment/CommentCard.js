import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const CommentCard = ({comment}) => {
  const { body } = comment;
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <p>
        {body}
      </p>
      <p>
        by: {user.username}
      </p>
    </div>
  )
}

export default CommentCard