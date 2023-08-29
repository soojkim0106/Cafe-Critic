import Nav from './Nav'
import Home from './Home'
import Signup from './Signup'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (

    <div>
      <div>Header</div>
      <Nav />
      <Switch>
        <Route exact path='/' render={() => <Home/>}></Route>
        <Route exact path='/signup' render={() => <Signup/>}/>
      </Switch>
    </div>
  )
}

export default App