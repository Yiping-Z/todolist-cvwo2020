import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListNotFound from './ListNotFound';

const List = ({ list, onDelete }) => {
  if (!list) return <ListNotFound />;
  return (
  <div className="listContainer">
    <h2>
      {list.date}
      {' - '}
      {list.title}
      {' '}
      <Link to={`/lists/${list.id}/edit`}>Edit</Link>
      <button className="delete" type="button" onClick={() => onDelete(list.id)}>
        Delete
      </button>
    </h2>
    <ul>
      <li>
        <strong>Date:</strong>
        {' '}
        {list.date}
      </li>
      <li>
        <strong>Title:</strong>
        {' '}
        {list.title}
      </li>
      <li>
        <strong>Description:</strong>
        {' '}
        {list.description}
      </li>
      <li>
        <strong>Tags:</strong>
        {' '}
        {list.tags}
      </li>
      <li>
        <strong>Completed:</strong>
        {' '}
        {list.completed ? 'yes' : 'no'}
      </li>
    </ul>
  </div>
);
};

List.propTypes = {
  list: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};
  
List.defaultProps = {
 list: undefined,
};

export default List;
