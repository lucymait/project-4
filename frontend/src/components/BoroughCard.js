import React from 'react'
import { Link } from 'react-router-dom'

const BoroughCard = ( { props, id,  name, image }) => {
  console.log(props)
  return <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile" key={id}>
    <Link to={{ pathname: `borough/${id}` }}>
      <div className="card borough">
        <div className="card-content borough">
          <h2 className="subtitle is-mobile borough">{name}</h2>
        </div>
        <div className="card-image">
          <figure className="image is-5by4">
            <img src={image} className="borough-image"></img>
          </figure>
        </div>
      </div>
    </Link>
  </div>


}

export default BoroughCard