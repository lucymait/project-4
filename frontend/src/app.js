import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './style.scss'

import Register from './components/Register'
import Home from './components/Home'
import Borough from './components/Borough'
import FitnessClasses from './components/FitnessClasses'
import SingleFitnessClass from './components/SingleFitnessClass'
import Login from './components/Login'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/borough' component={Borough}></Route>
        <Route exact path='/borough/:id' component={FitnessClasses}></Route>
        <Route exact path='/fitness/:id' component={SingleFitnessClass}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/' component={Home}></Route>
      </Switch>
    </HashRouter>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)