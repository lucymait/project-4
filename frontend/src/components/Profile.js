import React, { useState, useEffect } from 'react'


import NavBar from './NavBar'

import auth from '../../lib/auth'
import axios from 'axios'

const Profile = () => {
  const [profile, setProfile] = useState({ fitness: [] })

  useEffect(() => {
    fetch('api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => resp.json())
      .then(resp => {
        setProfile(resp)
      })
  }, [])


  function deleteFitnessClass(e) {
    const id = (e.target.parentNode.id)
    axios.delete(`api/fitness/bookedclass/${id}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => {
        fetch('api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
          .then(resp => resp.json())
          .then(resp => {
            setProfile(resp)
          })
      })
  }

  return <>
    <section className="section profile-section">
      <div className="container">
        <div className="profile-header">
          <h3>Welcome back {profile.username}!</h3>
          <img src={profile.image === null ? 'https://static.thenounproject.com/png/629576-200.png' : `http://localhost:8000${profile.image}`} />
        </div>
        <h2>Booked Classes</h2>
        <div className="booked-classes">
          {profile.fitness.length === 0 ? <h2>No Classes Booked</h2> :
            profile.fitness.map(bookedclass => {
              return <div className='card' id={bookedclass.id} key={bookedclass.id}>
                <div className="card-content">
                  <h3>{bookedclass.name}</h3>
                  <p>{bookedclass.time_of_class}</p>
                  <p>Date Booked: {bookedclass.data_booked}</p>
                </div>
                <button onClick={(e) => deleteFitnessClass(e)} className="button">Cancel</button>
              </div>
            })}

        </div>
      </div>
    </section>
    <NavBar />
  </>




}

export default Profile