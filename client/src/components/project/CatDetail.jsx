import { useState } from "react";

function CatDetail({ cat }) {
  const {
    name,
    age,
    gender,
    breed,
    temperament,
    image,
    availability,
    fixed,
    good_with_children,
    good_with_animal,
    id
  } = cat;
  const [showDetails, setShowDetails] = useState(false);

  function toggleDetails() {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  }

  return (
    <li className="cat-detail" id={id}>
      <h2>{name}</h2>
      <img src={image} alt={name} />
      {showDetails && (
        <>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>Breed: {breed}</p>
          <p>Temperament: {temperament}</p>
          <p>Availability: {availability ? "Yes" : "No"}</p>
          <p>Fixed: {fixed ? "Yes" : "No"}</p>
          <p>Good with Children: {good_with_children ? "Yes" : "No"}</p>
          <p>Good with Animals: {good_with_animal ? "Yes" : "No"}</p>
        </>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? "See Less" : "See More"}
      </button>
    </li>
  );
}

export default CatDetail;
