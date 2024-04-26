import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/registration");
    }
  }, [user, navigate])

  useEffect(() => {
    fetch("/reviews")
      .then((resp) => {
        if (resp.ok) {
          return resp.json().then(setReviews).then(setUser);
        }
        return resp.json().then((errorObj) => toast.error(errorObj.message));
      })
      .catch((err) => console.log(err));
  }, [setUser]);

  return (
    <div>ReviewCard</div>
  )
}

export default ReviewCard