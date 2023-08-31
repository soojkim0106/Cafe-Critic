import Nav from './Nav'
import Home from './Home'
import Signup from './signup'
import Signin from './Signin'
import Books from './Books'
import BandR from './BandR'
import { Switch, Route } from 'react-router-dom'
import { useState, useEffect} from 'react'
import Footer from "./Footer"

function App () {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/check_session').then((r) => {
      if (r.ok){
        r.json().then((user) => {
          setUser(user) 
          console.log(user)})
      }
    }) 
  }, [])

  function onLogin(aUser){
    setUser(aUser)
  }
  function logout(){
    setUser(null)
  }

  return (

    <div>
      <h1>𝓖𝓸𝓸𝓭 𝓔𝓪𝓽 𝓜𝓪𝓽𝓮</h1>
      <Nav user={user} logout={logout}/>
      <Switch>
        <Route exact path='/' render={() => <Home/>} />
        <Route exact path='/signup' render={() => <Signup/>}/>
        <Route exact path='/signin' render={() => <Signin onLogin={onLogin}/>}/>
        <Route exact path='/books' render={() => <Books user={user} />}/>
        <Route exact path='/brSignup' render={() => <BandR user={user}/>}/>
      </Switch>
      <Footer/>
    </div>
  );
};

export default App