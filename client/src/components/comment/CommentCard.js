import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CommentCard = ({comment}) => {
  const { body } = comment;

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