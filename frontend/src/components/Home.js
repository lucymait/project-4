import React from 'react'
import '../../src/style.scss'
import { Link } from 'react-router-dom'

const Home = () => (
  <section className="hero is-light is-fullheight homepage">
    <img id='background-image' src='https://images.squarespace-cdn.com/content/v1/52540926e4b0d49865bee20d/1525949988855-GMKRG7DQ2UKZYSYRBQ1M/ke17ZwdGBToddI8pDm48kLR2rgEg1jPu1GtjV4K1vZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0scl71iiVnMuLeEyTFSXT3qwhEKW1IfUKL5GUNLdDa9MjuPXcXiDenG_NSvE-2lGCg/HAN_0062.jpg' />
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="title">
          <h1>FITBOOK</h1>
          <img src='https://i.imgur.com/50EzKYk.png' />
        </div>
        <div className="description">
          <p>Search, Find &  Book
            classes <br /> on the day, for the day</p>
          <div className="subtitle">
            <Link to='/register'><button className="button">Register</button></Link>
            <Link to='/login'><button className="button">Login</button></Link>
          </div>
        </div>
      </div>
    </div>
  </section>

)

export default Home