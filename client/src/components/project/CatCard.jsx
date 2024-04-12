// import

import { Link } from "react-router-dom"

function CatCard({cat}) {
  const {name, age, gender, breed, temperment, image, availability, fixed, id } = cat

  

  return (
    <li id={id}>
      <Link to={`/cats/${id}`}>
        <img src={image} alt={name}/>
        <>
          <h2>{name}</h2>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>Breed: {breed}</p>
          <p>Temperment: {temperment}</p>
          <p>Availability: {availability}</p>
          <p>Fixed: {fixed}</p>
        </>
      </Link>
    </li>
  )
}

export default CatCard
