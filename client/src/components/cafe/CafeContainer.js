import {useState, useEffect} from 'react'
import CafeCard from './CafeCard'
import { useOutletContext } from 'react-router-dom'

const CafeContainer = () => {
    const {cafes} = useOutletContext()
    
  return (
    <div>
        Cafe Container
        {cafes.map((cafe => (<CafeCard key={cafe.id} cafe={cafe}/>)))}
    </div>
  )
}

export default CafeContainer