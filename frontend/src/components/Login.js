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
        const token = resp.data.token
        auth.setToken(token)
        props.history.push(`/profile/${auth.getUserId()}`)
      })
      .catch(err => console.log(err))
  }

  console.log(props)
  return <section className="section">
    <div className="container register">
      <h1 className="title register">Login</h1>
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="field">
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
        </div>
        <div className="field">
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
        </div>
        <button className="button is-success">
          Login
        </button>
      </form>
    </div>
  </section>


}


export default Login 