import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bulma'
import SingleClassCard from './SingleClassCard'
import Navbar from './NavBar'
import moment from 'moment'
import axios from 'axios'

const FitnessClasses = (props) => {
  const [borough, setBorough] = useState({ fitnessclass: [] })
  const [AllfitnessClasses, setAllClasses] = useState([])
  const [filteredClass, setFilteredClass] = useState([])

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/fitness/borough/${id}`)
      .then(resp => {
        setBorough(resp.data)
        const unsortedData = resp.data.fitnessclass
        const sortedData = unsortedData.sort((a,b) => {
          return parseInt(a.time_of_class.split(':').join('')) - parseInt(b.time_of_class.split(':').join(''))
        })
        // console.log(unsortedData)
        // console.log(sortedData)
        setAllClasses(sortedData)
        setFilteredClass(sortedData)
      })
  }, [])

  function filterClasses(e) {
    const chosenClass = e.target.value
    if (e.target.value === 'All') {
      setFilteredClass(AllfitnessClasses)
    } else {
      const filteredClasses = AllfitnessClasses.filter(classes => {
        return classes.activity_type === chosenClass
      })
      setFilteredClass(filteredClasses)
    }
  }

  return <>
    <Navbar />
    <section className="section classes-section">
      <div className="container">
        <div className="header">
          <h2 className="subtitle">{borough.name}</h2>
          <div className="select">
            <select onChange={(e) => filterClasses(e)}>
              <option value="All">All</option>
              <option value="Yoga">Yoga</option>
              <option value="HIIT">HIIT</option>
              <option value="Barre">Barre</option>
              <option value="Dance">Dance</option>
              <option value="Pilates">Pilates</option>
              <option value="Boxing">Boxing</option>
              <option value="Cycling">Cycling</option>
            </select>
          </div>
        </div>
        <h2 className="date">Date: {moment().format('MMMM Do')}</h2>
        <div>
          {filteredClass.map(elem => {
            return <SingleClassCard className='card class-card' props={props} key={elem.id} {...elem} />
          })}
        </div>
        <div className="empty-div"></div>
      </div>
      <div className="navbar-test"></div>
    </section>
  </>
}

export default FitnessClasses