import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Home = (props) => {
const handleClick = () => {
    axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }
return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">To-Do-List</h1>
        <p className="lead">
            To-do list for better organisation and efficiency.
        </p>
        <hr className="my-4" />
        <div>
      <Link to='/lists/login'>Log In</Link>
      <br></br>
      <Link to='/lists/signup'>Sign Up</Link>
      <br></br>
      { 
        props.loggedInStatus ? 
        <Link to='/logout' onClick={handleClick}>Log Out</Link> : 
        null
      }
    </div>
      </div>
    </div>
  </div>
  );
};
export default Home;

