import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CafeCard from "./CafeCard";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const CafeContainer = () => {
  const [cafes, setCafes] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  //! Send them away if they are not logged in
    useEffect(() => {
    if (!user) {
      navigate("/registration");
    }
  }, [user, navigate])
  
  useEffect(() => {
    fetch("/cafes")
      .then((resp) => {
        if (resp.ok) {
          return resp.json().then(setCafes).then(setUser);
        }
        return resp.json().then((errorObj) => toast.error(errorObj.message));
      })
      .catch((err) => console.log(err));
  }, [setUser]);
  
  return (
    <div>
      Cafe Container
      {cafes && cafes.map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
};

export default CafeContainer;
