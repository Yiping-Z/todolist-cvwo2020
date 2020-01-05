import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, isEmptyObject, validateList } from '../helpers/helpers';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import { Link } from 'react-router-dom';
import ListNotFound from './ListNotFound';

class ListForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        list: props.list,
        errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateList('date', formattedDate);
      },
    });
  }

  componentWillReceiveProps({ list }) {
    this.setState({ list });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { list } = this.state;
    const errors = validateList(list);
  
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(list);
    }
  }

  handleInputChange(list) {
    const { target } = list;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateList(name, value);
  }

  updateList(key, value) {
    this.setState(prevState => ({
      list: {
        ...prevState.list,
        [key]: value,
      },
    }));
  }

  renderErrors() {
    const { errors } = this.state;
  
    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the list from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { list } = this.state;
    const { path } = this.props;

    if (!list.id && path === '/lists/:id/edit') return <ListNotFound />;
    const cancelURL = list.id ? `/lists/${list.id}` : '/lists';
    const title = list.id ? `${list.date} - ${list.title}` : 'New List';

    return (
      <div>
        <h2>{title}</h2>
        {this.renderErrors()}
        <form className="listForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">
              <strong>Title:</strong>
              <input type="text" id="title" name="title" onChange={this.handleInputChange} value={list.title}/>
            </label>
          </div>
          <div>
            <label htmlFor="date">
             <strong>Date:</strong>
             <input
              type="text"
              id="date"
              name="date"
              ref={this.dateInput}
              autoComplete="off"
              value={list.date}
             />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <strong>Description:</strong>
              <textarea cols="30" rows="10" id="description" name="description" onChange={this.handleInputChange} value={list.description}/>
            </label>
          </div>
          <div>
            <label htmlFor="tags">
              <strong>Tags:</strong>
              <input type="text" id="tags" name="tags" onChange={this.handleInputChange} value={list.tags}/>
            </label>
          </div>
          <div>
            <label htmlFor="completed">
              <strong>Completed:</strong>
              <input type="checkbox" id="completed" name="completed" onChange={this.handleInputChange} value={list.completed}/>
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

ListForm.propTypes = {
    list: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
};
  
ListForm.defaultProps = {
  list: {
      title: '',
      date: '',
      description: '',
      tags: '',
      completed: false,
    },
};

export default ListForm;