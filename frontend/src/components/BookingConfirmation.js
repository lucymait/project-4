import React, { useState, useEffect } from 'react'
import 'bulma'
import { Link } from 'react-router-dom'


const BookingConfirmation = (props) => {
  const [fitnessclass, setFitnessclass] = useState([])

  console.log(props)

  useEffect(() => {
    const id = props.match.params.id
    fetch(`/api/fitness/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setFitnessclass(resp)
      })
  }, []) 

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
          <p className="subtitle">Class Booked:{fitnessclass.name}</p>
          <p className="subtitle">Date Booked:</p>
          <Link to='/profile'><button className="button">View Booked Classes</button></Link>
        </div>
      </div>
    </section>
  </>
}

export default BookingConfirmation