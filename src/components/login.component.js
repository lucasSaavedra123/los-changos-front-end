import React, { useState } from 'react'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN_URL, AUTH0_DATABASE_CONNECTION } from '../CONSTANTS'
import auth0 from 'auth0-js'

const LogIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  var webAuth = new auth0.Authentication({ domain: AUTH0_DOMAIN_URL, clientID: AUTH0_CLIENT_ID });

  const handleLogIn = async (event) => {
    console.log(email)
    console.log(password)
    event.preventDefault();


    webAuth.login({
      realm: AUTH0_DATABASE_CONNECTION,
      username: email,
      password: password,
    }, function (error,authResult) {
      if (error) return console.log('Something went wrong: ' + authResult);
      return alert('success signup without login!')
    });

  }


    return (
      <form onSubmit={handleLogIn}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmailChange}/>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" onChange={handlePasswordChange}/>
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
}

export default LogIn