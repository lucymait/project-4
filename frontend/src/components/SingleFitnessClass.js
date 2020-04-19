import React, { useState, useEffect } from 'react'
import 'bulma'


const SingleFitnessClass = (props) => {
  const [fitnessclass, setFitnessclass] = useState([])

  useEffect(() => {
    const id = props.match.params.id
    fetch(`/api/fitness/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setFitnessclass(resp)
      })
  }, [])

  const gymname = fitnessclass.gym ? fitnessclass.gym.name : null
  const gymfacilities = fitnessclass.gym ? fitnessclass.gym.facilities : null
  return <>
    <h1>Hello World</h1>
    <section className="section">
      <div className="container">
        <h2 className="subtitle">{fitnessclass.name}</h2>
        <h2> Location : {gymname}</h2>
        <h3>Gym Facilites : {gymfacilities}</h3>
      </div>
    </section>
  </>
}

export default SingleFitnessClass