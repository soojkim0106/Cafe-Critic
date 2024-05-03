import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import './commentcard.css'

const CommentCard = ({ comment, user }) => {
  const { id, body, user_id, username } = comment;

  const handleDeleteComment = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your comment?"
    );

    if (confirmDelete) {
      fetch(`/comments/${id}`, {
        method: "DELETE",
      })
        .then((resp) => {
          if (!resp.ok) {
            return resp.json().then((errorObj) => {
              toast.error(errorObj.message);
            });
          }
        })
        .then(() => {
          toast.success("Comment deleted successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        });
    }
  };

  return (
    <>
      <div className="comment-body">
        <p>{body}</p>
        <p>by: {username}</p>
        {user.id === user_id && (
        <button onClick={handleDeleteComment}>Delete</button>
      )}
        {/* <button onClick={handleDeleteComment}>Delete</button> */}
      </div>
    </>
  );
};

export default CommentCard;
