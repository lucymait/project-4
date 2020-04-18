import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Borough = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/fitness/borough/')
      .then(resp => setData(resp.data))
  }, [])



  return <>
    <section className="section borough">
      <h1 className="title borough">Pick a Borough</h1>
      <div className="container">
        <div className="columns is-multiline">
          {data.map((borough) => {
            return <div className="column is-one-third" key={borough.id}>
              <Link to={{ pathname: `borough/${borough.id}` }}>
                <div className="card">
                  <div className="card-content">
                    <h2 className="subtitle borough">{borough.name}</h2>
                  </div>
                  <div className="card-image">
                    <figure className="card-image is-3by3">
                      <img src={borough.image} className="borough-image"></img>
                    </figure>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>
  </>
}

export default Borough