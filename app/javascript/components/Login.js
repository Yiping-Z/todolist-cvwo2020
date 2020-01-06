import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      errors: ''
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
let user = {
      username: username,
      email: email,
      password: password
    }
    
axios.post('https://todolist-react-cvwo.herokuapp.com/lists/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/lists')
  }
handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }
render() {
    const {username, email, password} = this.state
return (
    <div>
          <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Log in</h1>
            <p className="lead text-muted">
            Try out our to-do-list for better organisation and efficiency.
            </p>
          </div>
    </section>
    <div className="primary-color d-flex align-items-center justify-content-center">
        <form onSubmit={this.handleSubmit}>
        <div>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          </div>
          <div>
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          </div>
          <div>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          </div>
          <button className="btn btn-lg custom-button" placeholder="submit" type="submit">
            Log In
          </button>
          <div className="lead">
           or <Link to='/'>back</Link>
          </div>
          
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
      </div>
      
    );
  }
}
export default Login;