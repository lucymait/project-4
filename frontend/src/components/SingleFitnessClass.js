import React, { useState, useEffect } from 'react'
import 'bulma'
import axios from 'axios'
import moment from 'moment'
import auth from '../../lib/auth'


const SingleFitnessClass = (props) => {
  const [fitnessclass, setFitnessclass] = useState([])

  useEffect(() => {
    const id = props.match.params.id
    fetch(`/api/fitness/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        setFitnessclass(resp)
      })
  }, [])
  // console.log(bookedclass)

  function handleBooking(e) {
    const id = auth.getUserId()
    const data = {
      name: fitnessclass.name,
      gym: gymname,
      instructor: instructor,
      description: fitnessclass.description,
      time_of_class: fitnessclass.time_of_class,
      activity_type: fitnessclass.activity_type,
      data_booked: moment().format('MMM Do')
    }
    console.log(data)
    axios.post('/api/fitness/bookedclass/', data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => {
        props.history.push(`/profile/${id}`)
      })
  }

  const gymname = fitnessclass.gym ? fitnessclass.gym.name : null
  const gymfacilities = fitnessclass.gym ? fitnessclass.gym.facilities : null
  const instructor = fitnessclass.instructor ? fitnessclass.instructor.name : null
  return <>
    <section className="section fitnessclass-section">
      <div className="container">
        <h2 className="subtitle">{fitnessclass.name}</h2>
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
          <h5> {instructor}</h5>
        </div>
        <p className='card'>{fitnessclass.description}</p>
        <button onClick={(e) => handleBooking(e)} className='button'>Book Now</button>
      </div>
    </section>
  </>
}

export default SingleFitnessClass