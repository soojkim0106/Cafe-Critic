import { useState, useEffect } from "react";
import CatDetail from "./CatDetail";


function CatCard() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetch('/cats')
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((error) => console.error("Error fetching cats:", error));
  }, []);

  return (
  <div>
    <h1>Cats</h1>
    <ul>
      {cats.map((cat) => (
        <CatDetail key={cat.id} cat={cat} />
      ))}
    </ul>
  </div>
);
}

export default CatCard
