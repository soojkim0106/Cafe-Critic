import React from 'react'
import './searchbar.css'

const SearchBar = ({handleSearch, searchQuery}) => {
  return (
    <div>
        <input type="text" className="searchbar-input" placeholder="Search by user" onChange={handleSearch} value={searchQuery}/>
    </div>
  )
}

export default SearchBar