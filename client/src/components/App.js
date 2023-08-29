import Nav from './Nav'
import Home from './Home'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (

    <div>
      <div>Header</div>
      <Nav />
      <Switch>
        <Route exact path='/' render={() => <Home/>}></Route>
      </Switch>
    </div>
  )
}

export default App