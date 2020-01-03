import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <Link to="/events">To-Do-List</Link>
    </h1>
  </header>
);

export default Header;
