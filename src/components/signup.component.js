import React, { useState } from 'react'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN_URL, AUTH0_DATABASE_CONNECTION } from '../CONSTANTS'
import auth0 from 'auth0-js'
import LoginButton from './loginButton.component'


const SignUp = () => {



  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  var webAuth = new auth0.WebAuth({ domain: AUTH0_DOMAIN_URL, clientID: AUTH0_CLIENT_ID });

  const handleRegister = async (event) => {
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    event.preventDefault();


    webAuth.signup({
      connection: AUTH0_DATABASE_CONNECTION,
      email: email,
      username: email,
      password: password,
      user_metadata: { first_name: firstName, last_name: lastName },
    }, function (error) {
      if (error) return alert('Something went wrong: ' + error.message);
      return alert('success signup without login!')
    });

  }

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input type="text" className="form-control" placeholder="First name" onChange={handleFirstNameChange} />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name" onChange={handleLastNameChange} />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmailChange} />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" onChange={handlePasswordChange} />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <LoginButton></LoginButton>
      </p>
      
    </form>
  )


}

export default SignUp



/*
class App extends React.Component {
  state = {
    company: ""
  };

  onChange = e => {
    this.setState({ company: e.target.value });
  };

  handleCompanySubmit = event => {
    event.preventDefault();
    console.log(this.state.company);
  };

  render() {
    return (
      <form onSubmit={this.handleCompanySubmit}>
        <label>
          <input
            placeholder="put company name here"
            value={this.state.company}
            onChange={this.onChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.6.3/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.6.3/umd/react-dom.production.min.js"></script>

<div id="root"></div>
*/