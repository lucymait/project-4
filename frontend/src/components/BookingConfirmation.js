import React, { useState, useEffect } from 'react'
import 'bulma'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'


const BookingConfirmation = () => {

  const id = auth.getUserId()

  return <>
    {/* <h1>Hello World</h1> */}
    <section className="section">
      <div className="container has-text-centered">
        <img className="booking-image" src='https://i.imgur.com/50EzKYk.png' />
        <div className="title">
          <h1>Booking Confirmation</h1>
        </div>
        <div className="subtitle">
          <p>Thank you for booking with FITBOOK </p><br/>
          <Link to={'/profile'}><button className="button">View Booked Classes</button></Link>
        </div>
      </div>
    </section>
  </>
}

export default BookingConfirmation