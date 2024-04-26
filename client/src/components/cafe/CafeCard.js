import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CafeCard = ({cafe}) => {
  
    const { id, name, image } = cafe;
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    useEffect(() => {
        if (!imageUrl)
          fetch(`/images/${image}`)
            .then((data) => {
              return data.blob();
            })
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              setImageUrl(url);
              setImageLoaded(true);
            })
            .catch((error) => console.error("Error:", error));
          return () => {
            if (imageUrl) {
              URL.revokeObjectURL(imageUrl);
            }
          };
        }, [imageUrl, image]);

  return (
    <div className='cafe-card'>
        <button>
        <Link to={`/cafes/${id}`} state={{ cafe }}>
          <h3>{name}</h3>
          {imageLoaded && imageUrl && <img src={imageUrl} alt={name} />}
        </Link>
      </button>
    </div>
  )
}

export default CafeCard