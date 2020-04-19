import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bulma'

const FitnessClasses = (props) => {
  const [borough, setBorough] = useState({ fitnessclass: [] })

  useEffect(() => {
    const id = props.match.params.id
    fetch(`/api/fitness/borough/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setBorough(resp)
      })
  }, [])

  return <>
    {/* <h1>Hello World</h1> */}
    <section className="section">
      <div className="container">
        <h2 className="subtitle">{borough.name}</h2>
        <div>
          {borough.fitnessclass.map(elem => {
            return <div className="card" key={elem.id}>
              <div className="card-content class">
                <div className="elem">
                  <h1>{elem.name}</h1>
                  <h2>{elem.time_of_class}</h2>
                </div>
                <div className="buttons">
                  <Link to={{ pathname: `fitness/${elem.id}` }}>
                    <button className="button fitness">More Info</button>
                  </Link>
                  <button className="button fitness">Book Now</button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  </>
}

export default FitnessClasses