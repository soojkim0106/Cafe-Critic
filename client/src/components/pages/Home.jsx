// import styled from 'styled-components'
import NavBar from "../navigation/NavBar"
import CatCard from "../project/CatCard"

function Home(){
  return(
    <div className="nav-bar-container">
      <h1 className="banner">Meowstar</h1>
      <NavBar />
      <CatCard />
    </div>
  )
}

export default Home