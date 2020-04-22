import React from 'react'
import '../../src/style.scss'
import { Link } from 'react-router-dom'

const Home = () => (
  <section className="hero is-light is-fullheight homepage">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="title">
          <h1>FITBOOK</h1>
          <img src='https://i.imgur.com/50EzKYk.png'/>
        </div>
        <div>
          <p className="description">Search, Find & Book classes</p>
          <p className="description">within 24hrs</p>
        </div>
        <div className="subtitle">
          <Link to='/register'><button className="button is-large">Register</button></Link>
          <Link to='/login'><button className="button is-large">Login</button></Link>
        </div>
      </div>
    </div>
  </section>

)

export default Home