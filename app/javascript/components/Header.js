import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Header = (props) => {
  const handleClick = () => {
    axios.delete('http://todolist-react-cvwo.herokuapp.com/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }
  return (
  <header>
    <h1>To-Do-List</h1>
      <Link to='/' onClick={handleClick}  className="btn btn-lg custom-button"
          role="button">Log Out</Link>
  </header>
  );
};

export default Header;
