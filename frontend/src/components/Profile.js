import React, { useState, useEffect } from 'react'
import 'bulma'

const Profile = () => {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    fetch('/profile')
      .then(resp => resp.json())
      .then(resp => {
        setProfile(resp)
      })
  }, [])

  return <>
    <section className="section">
      <div className="container has-text-centered">
        <img className="booking-image" src='https://i.imgur.com/50EzKYk.png' />
        <div className="title">
          <h1>Profile</h1>
        </div>
        <div className="subtitle">
          {profile.map((user) => {
            return <div key={user.id}>
              <h2>{user.username}</h2>
            </div>
          })}
        </div>
      </div>
    </section>
  </>


}

export default Profile