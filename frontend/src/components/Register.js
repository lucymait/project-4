import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {
  const [registerData, setRegisterData] = useState({})
  const [errors, setErrors] = useState({ username: [0], email: [0], password: [0], password_confirmation: [0] })
  // const { register } = useForm()

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...registerData, [name]: value }
    setRegisterData(data)
  }


  function handleSubmit(event) {
    event.preventDefault()
    const imageInput = document.getElementsByClassName('image')
    const image = imageInput.image.files
    const body = new FormData(form)
    const form = document.querySelectorAll('form')
    body.append('email', registerData.email)
    body.append('username', registerData.username)
    body.append('password', registerData.password)
    body.append('password_confirmation', registerData.password_confirmation)
    body.append('image', image[0], image[0].name)
    axios.post('/api/register',
      body)
      .then(resp => {
        console.log(resp.data)
        props.history.push('/login')
      })
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.request.response)
      })
  }

  console.log(errors)

  // const emailError = errors ? 

  // console.log(registerData)
  return <section className="section register-section">
    <img src='https://i.imgur.com/50EzKYk.png' />
    <form
      className="form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
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
      {!errors.email && <small className="help is-danger">
        {'Enter a valid email address'}
      </small>}
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
      {!errors.username && <small className="help is-danger">
        {'A user with that username already exists'}
      </small>}
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
      {!errors.password && <small className="help is-danger">
        {'This password is too short. It must contain at least 8 characters'}
      </small>}
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
      {!errors.password_confirmation && <small className="help is-danger">
        {'Passwords do not match'}
      </small>}
      <div className="file-upload">
        <input
          onChange={handleChange}
          type="file"
          name="image"
          className="input is-rounded image"
        />
      </div>
      {errors.image && <small className="help is-danger">
        {errors.image}
      </small>}
      <button className='button'>
        Register
      </button>
    </form>
  </section>


}

export default Register