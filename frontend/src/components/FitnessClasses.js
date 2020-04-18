import React, { useState, useEffect } from 'react'
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
        <div className="columns is-multiline">
          <div className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <h2 className="subtitle">{borough.name}</h2>

              </div>
              <div className="card-image">
                <figure className="card-image is-3by3">
                  <img src={borough.image} className="art-image"></img>
                </figure>
              </div>
            </div>
          </div>
          <div className="column is-one-third">
            {borough.fitnessclass.map(elem => {
              return <div key={elem.id}>
                <h1>{elem.name}</h1>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  </>
}

export default FitnessClasses