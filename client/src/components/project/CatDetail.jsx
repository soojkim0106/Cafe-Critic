import { useState } from "react";

function CatDetail({ cat }) {
  const {
    name,
    age,
    gender,
    breed,
    temperment,
    image,
    availability,
    fixed,
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
          <p>Temperment: {temperment}</p>
          <p>Availability: {availability}</p>
          <p>Fixed: {fixed ? 'Yes' : 'No'}</p>
        </>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? "See Less" : "See More"}
      </button>
    </li>
  );
}

export default CatDetail;
