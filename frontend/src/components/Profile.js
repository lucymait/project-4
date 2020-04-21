import React, { useState, useEffect } from 'react'

import NavBar from './NavBar'

import auth from '../../lib/auth'

const Profile = () => {
  const [profile, setProfile] = useState({ fitness: [] })

  useEffect(() => {
    console.log(auth.getToken())
    fetch('api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => resp.json())
      .then(resp => {
        setProfile(resp)
      })
  }, [])

  return <>
    <section className="section">
      <div className="container has-text-centered">
        <img className="booking-image" src= { profile.image === null ?  'https://static.thenounproject.com/png/629576-200.png' : `http://localhost:8000${profile.image}`} />
        <div className="title">
          <h3>Welcome back {profile.username}</h3>
        </div>
        <div className="booked-classes">
          <h2>Booked Classes</h2>
          {profile.fitness.map(bookedclass => {
            return <div key={bookedclass.id}>
              <h2>{bookedclass.name}</h2>
              <p>{bookedclass.time_of_class}</p>
            </div>
          })}
        </div>
      </div>
    </section>
    <NavBar />
  </>


}

export default Profile