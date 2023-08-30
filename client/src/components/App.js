import Nav from './Nav'
import Home from './Home'
import Signup from './Signup'
import Signin from './Signin'
import Books from './Books'
import { Switch, Route } from 'react-router-dom'
import { useState, useEffect} from 'react'
import './index.css'; 

function App () {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/check_session').then((r) => {
      if (r.ok){
        r.json().then((user) => setUser(user))
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
      <div>Header</div>
      <Nav user={user} logout={logout}/>
      <Switch>
        <Route exact path='/' render={() => <Home/>}></Route>
        <Route exact path='/signup' render={() => <Signup/>}/>
        <Route exact path='/signin' render={() => <Signin onLogin={onLogin}/>}/>
        <Route exact path='/books' render={() => <Books />}/>
      </Switch>
    </div>
  );
};

export default App