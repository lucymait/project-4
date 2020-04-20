import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'
import { withRouter } from 'react-router-dom'

class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      navMobileOpen: false
    }
  }

  HandleLogout() {
    auth.logOut()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navMobileOpen: false })
    }
  }

  render() {
    const isLoggedIn = auth.isLoggedIn()

    return <nav className="navbar is-fixed-bottom" id="nav-styling">
      <div className="navbar-item">
        <Link to="/borough">Explore</Link>
      </div>
      <div className="navbar-item">
        <img src='https://i.imgur.com/50EzKYk.png' />
      </div>
      <div className="navbar-item"
        onClick={() => this.HandleLogout()}>
        <Link to="/">Log out</Link>
      </div>
    </nav>
  }
}
export default withRouter(NavBar)