import React from 'react'
import { Link } from 'react-router-dom'

const SingleFitnessCard = ({  id, name, time_of_class  }) => {
  return <>
    <div className="card class-card" key={id}>
      <div className="card-content">
        <div className="elem">
          <h1>{name}</h1>
          <h2>{time_of_class}</h2>
        </div>
      </div>
      <div className="buttons are-small">
        <Link to={{ pathname: `fitness/${id}` }}>
          <button className="button">More Info</button>
        </Link>
        <Link to='/bookingconfirmation'><button className="button">Book Now</button></Link>
      </div>
    </div>
  </>
}

export default SingleFitnessCard