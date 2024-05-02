import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CafeCard from "./CafeCard";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import './cafecontainer.css'

const CafeContainer = () => {
  const [cafes, setCafes] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate();

  const cafesPerPage = 3;
  const totalPages = Math.ceil(cafes.length / cafesPerPage);
  const displayedCafes = cafes.slice((pages - 1) * cafesPerPage, pages * cafesPerPage);

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

  const handleNextPage = () => {
    setPages(pages + 1);
  }

  const handlePrevPage = () => {
    setPages(pages - 1);
  }
  
  return (
    <div className='cafe-list'>
      {displayedCafes && displayedCafes.map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
      <div className="direction-btn-container">
      <button className='direction-btn' onClick={handlePrevPage} disabled={pages === 1}>Back</button>
      <button className='direction-btn' onClick={handleNextPage} disabled={pages >= totalPages}>Next</button>
      </div>
    </div>
  );
};

export default CafeContainer;
