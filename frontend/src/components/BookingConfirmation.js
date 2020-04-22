import React, { useState, useEffect } from 'react'
import 'bulma'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'
import moment from 'moment'
// import axios from 'axios'


const BookingConfirmation = () => {
  const id = auth.getUserId()
  const [fitnessClass, setFitnessClass] = useState({ fitness: [] })

  useEffect(() => {
    console.log(auth.getToken())
    fetch('api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => resp.json())
      .then(resp => {
        setFitnessClass(resp)
      })
  }, [])


  return <>
    {/* <h1>Hello World</h1> */}
    <section className="section">
      <div className="container has-text-centered">
        <img className="booking-image" src='https://i.imgur.com/50EzKYk.png' />
        <div className="title">
          <h1 className="confirmation">Booking Confirmation</h1>
          <h2 className="date-subtitle">Date: {moment().format('MMMM Do')}</h2>
        </div>
        <div className="subtitle">
          <p className="booking-p">Thank you {fitnessClass.username} for booking with FITBOOK </p><br />
          {/* <div className="booked-classes">
            {fitnessClass.fitness.map(bookedclass => {
              return <div className='card' id={bookedclass.id} key={bookedclass.id}>
                <div className="card-content">
                  <h3>{bookedclass.name}</h3>
                  <p>{bookedclass.time_of_class}</p>
                </div>
              </div>
            })}
          </div> <br/> */}
          <Link to={`/profile/${id}`}><button className="button booking">View Booked Classes</button></Link>
        </div>
      </div>
    </section>
  </>
}

export default BookingConfirmation