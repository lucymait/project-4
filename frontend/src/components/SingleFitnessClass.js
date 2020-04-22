import React, { useState, useEffect } from 'react'
import 'bulma'
import axios from 'axios'
import moment from 'moment'
import auth from '../../lib/auth'
import { Link } from 'react-router-dom'

import BookingConfirmation from './BookingConfirmation'


const SingleFitnessClass = (props) => {
  const [fitnessclass, setFitnessclass] = useState([])

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/fitness/${id}`)
      .then(resp => {
        // console.log(resp)
        setFitnessclass(resp.data)
      })
  }, [])

  function handleBooking(e) {
    const data = {
      name: fitnessclass.name,
      gym: gymname,
      instructor: instructor,
      description: fitnessclass.description,
      time_of_class: fitnessclass.time_of_class,
      activity_type: fitnessclass.activity_type,
      data_booked: moment().format('MMM Do')
    }
    axios.post('/api/fitness/bookedclass/', data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => {
        props.history.push('/bookingconfirmation')
      })
  }

  const gymname = fitnessclass.gym ? fitnessclass.gym.name : null
  const gymfacilities = fitnessclass.gym ? fitnessclass.gym.facilities : null
  const instructor = fitnessclass.instructor ? fitnessclass.instructor.name : null
  return <>
    <section className="section fitnessclass-section">
      <div className="container">
        <div className="exit">
          <Link className="delete" to="/borough"></Link>
        </div>
        <div className="subtitle">
          <div className="title">
            <h2>{fitnessclass.name}</h2>
          </div>
          <h4 id='class-time'>{fitnessclass.time_of_class}</h4>
        </div>
        <h4 id = 'activity-type'>Activity Type: {fitnessclass.activity_type}</h4>
        <div className="singlefitness-container">
          <h2> Location :</h2>
          <h5> {gymname}</h5>
        </div>
        <div className="singlefitness-container">
          <h2>Gym Facilites :</h2>
          <h5> {gymfacilities}</h5>
        </div>
        <div className="singlefitness-container">
          <h2>Instructor :</h2>
          <h5 className="instructor"> {instructor}</h5>
        </div>
        <p className='card'>{fitnessclass.description}</p>
        <button onClick={(e) => handleBooking(e)} className='button'>Book Now</button>
      </div>
    </section>
  </>
}

export default SingleFitnessClass