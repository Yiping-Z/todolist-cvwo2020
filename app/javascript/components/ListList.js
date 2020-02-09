import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      user_id, id, completed, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;

    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderLists() {
    const { activeId, lists } = this.props;
    const filteredLists = lists
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return filteredLists.map(list => (
      <li key={list.id} >
        <Link to={`/lists/${list.id}`} className={activeId === list.id ? 'active' : ''}>
          {list.date}
          {' - '}
          {list.title}
        </Link>
      </li>
    ));
  }
  // filter lists matching the search criteria are displayed

  render() {
    return (
      <section className="listList">
        <h2>Lists
            <Link to="/lists/new">New List</Link>
        </h2>
        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />
        <ul>{this.renderLists()}</ul>
      </section>
    );
  }
}

ListList.propTypes = {
  activeId: PropTypes.number,
  lists: PropTypes.arrayOf(PropTypes.object),
};
  
ListList.defaultProps = {
  activeId: undefined,
  lists: [],
};

export default ListList;