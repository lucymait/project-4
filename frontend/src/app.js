import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import 'bulma'
import './style.scss'
import axios from 'axios'

// import Borough from './components/Borough'
import Register from './components/Register'
import Home from './components/Home'
import Borough from './components/Borough'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/borough' component={Borough}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/' component={Home}></Route>
      </Switch>
    </HashRouter>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)