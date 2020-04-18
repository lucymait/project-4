import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {
  const [registerData, setRegisterData] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...registerData, [name]: value }
    setRegisterData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/register',
      registerData)
      .then(resp => {
        console.log(resp.data)
        props.history.push('/login')
      })
      .catch(err => console.log(err))
  }

  console.log(registerData)
  return <section className="section">
    <div className="container register">
      <h1 className="title register">Register</h1>
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
              type="text"
              name="username"
              className="input is-rounded"
              placeholder="Username"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
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
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              onChange={handleChange}
              type="password"
              name="password_confirmation"
              className="input is-rounded"
              placeholder="Confirm Password"

            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <button className="button is-success"
        >Register
        </button>
      </form>
    </div>
  </section>


}

export default Register