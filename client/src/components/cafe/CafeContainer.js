import {useState, useEffect} from 'react'
import CafeCard from './CafeCard'
import toast from "react-hot-toast";


const CafeContainer = () => {

    const [cafes, setCafes] = useState([])

    useEffect(() => {
      fetch('/cafes')
          .then(resp => {
            if (resp.ok) {
              return resp.json().then(setCafes)
            }
            return resp.json().then(errorObj => toast.error(errorObj.message))
          })
          .catch(err => console.log(err))
  }, []);
    
  return (
    <div>
        Cafe Container
        {cafes.map((cafe => (<CafeCard key={cafe.id} cafe={cafe}/>)))}
    </div>
  )
}

export default CafeContainer