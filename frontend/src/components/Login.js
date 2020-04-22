import React, { useState } from 'react'
import axios from 'axios'
import auth from '../../lib/auth'

const Login = (props) => {
  const [LoginData, setLoginData] = useState({})
  const [error, setErrror] = useState({ message: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...LoginData, [name]: value }
    setLoginData(data)
  }

  console.log(LoginData)

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login', LoginData)
      .then(resp => {
        auth.setToken(resp.data.token)
        props.history.push('/profile')
      })
      .catch(err => {
        setErrror(err.response.data)
      })
  }

  console.log(error)
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
        {error.message === 'Not Registered' ? <p>{error.message}
        </p> : null}
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
        {error.message ? <p>{error.message}
        </p> : null}
      </div>
      <button className="button is-success">
        Login
      </button>
    </form>
  </section>


}


export default Login 