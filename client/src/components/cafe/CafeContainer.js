import { useState, useEffect, useContext } from "react";
import CafeCard from "./CafeCard";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const CafeContainer = () => {
  const [cafes, setCafes] = useState([]);
  const { user, setUser } = useContext(UserContext);

  //   useEffect(() => {
  //     fetch('/me')
  //     .then(resp => {
  //         if (resp.ok) {
  //         resp.json().then(setUser)

  //         } else {
  //         toast.error('Please log in')
  //         }
  //     })
  // }, [])
  

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
      {cafes.map((cafe) => {
        if (cafe) {
          return <CafeCard key={cafe.id} cafe={cafe} />;
        }
        return null;
      })}
    </div>
  );
};

export default CafeContainer;
