import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import BoroughCard from './BoroughCard'
import SearchForm from './SearchForm'
import Navbar from './NavBar'

class Borough extends React.Component {
  constructor() {
    super()
    this.state = {
      boroughs: [],
      filteredBoroughs: [],
      query: ''

    }
  }


  componentDidMount() {
    axios.get('/api/fitness/borough/')
      .then(response => {
        this.setState({
          boroughs: response.data,
          filteredBoroughs: response.data
        })
      })
      .then(() => {
        console.log(this.state.boroughs)
      })
      .catch(error => console.error(error))
  }

  filterBoroughs(event) {
    const searchQuery = event.target.value
    const filteredBoroughs = this.state.boroughs.filter(borough => {
      const regex = new RegExp(searchQuery, 'i')
      return borough.name.match(regex)
    })
    this.setState({
      query: searchQuery,
      filteredBoroughs: filteredBoroughs
    })
  }
  

  render() {
    return <>
    <Navbar />
    <section className="section classes-section">
      <h1 className="title borough">Pick a Borough</h1>
      <SearchForm query={this.state.query} onChange={() => this.filterBoroughs(event)} />
      <div className="container is-mobile">
        <div className="columns is-mobile is-multiline">
          {this.state.filteredBoroughs.map((borough) => {
            return <BoroughCard props={this.props} key={borough.id} {...borough} />
          }
          )}
        </div>
      </div>
    </section>
    </>
  }
}

export default Borough