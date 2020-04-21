import React, { useState } from 'react'
import axios from 'axios'
import auth from '../../lib/auth'

const Login = (props) => {
  const [LoginData, setLoginData] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...LoginData, [name]: value }
    setLoginData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login', LoginData)
      .then(resp => {
        // const token = resp.data.token
        auth.setToken(resp.data.token)
        props.history.push(`/profile/${auth.getUserId()}`)
      })
      .catch(err => console.log(err))
  }

  return <section className="section login-section">
    <img src='https://i.imgur.com/50EzKYk.png' />
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="control has-icons-left has-icons-right">
        <input
          onChange={handleChange}
          type="text"
          name="email"
          className="input is-rounded"
          placeholder="Email"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </div>
      <div className="control has-icons-left has-icons-right">
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="input is-rounded"
          placeholder="Password"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </div>
      <button className="button is-success">
        Login
      </button>
    </form>
  </section>


}


export default Login 