import React, { useState, useEffect } from 'react'
import 'bulma'


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

  return <>
    <h1>Hello World</h1>
    <section className="section">
      <div className="container">
        <h2 className="subtitle">{fitnessclass.name}</h2>
      </div>
    </section>
  </>
}

export default SingleFitnessClass