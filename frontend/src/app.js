import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import './style.scss'
import Borough from './Borough'
import Register from './Register'

const App = () => {
  return <HashRouter>
    {/* <Navbar /> */}
    <Switch>
      <Route exact path = {'/borough'} component={Borough}/>
      <Route path="/register" component={Register}/>
    </Switch>
  </HashRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)