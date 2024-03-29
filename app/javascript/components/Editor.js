import React from 'react';
import axios from 'axios';
import Header from './Header';
import ListList from './ListList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import List from './List';
import { Switch } from 'react-router-dom';
import ListForm from './ListForm';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        lists: null,
    };
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  // fetch the lists from api
  componentDidMount() {
    axios
      .get('/api/lists.json')
      .then(response => this.setState({ lists: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  // receives a newList object and send a request to API to create a new list
  addList(newList) {
    axios
      .post('/api/lists.json', newList)
      .then((response) => {
        const savedList = response.data;
        this.setState(prevState => ({
          lists: [...prevState.lists, savedList],
        }));
        const { history } = this.props;
        history.push(`/lists/${savedList.id}`);
        // change the URL to that of the newly saved list
      })
      .catch((error) => {
        console.log(error);
      });
    }

    deleteList(listId) {
      const sure = window.confirm('Are you sure?');
      if (sure) {
        axios
          .delete(`/api/lists/${listId}.json`)
          .then((response) => {
            if (response.status === 204) {
              const { history } = this.props;
              history.push('/lists');
  
              const { lists } = this.state;
              this.setState({ lists: lists.filter(list => list.id !== listId) });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    updateList(updatedList) {
      axios
        .put(`/api/lists/${updatedList.id}.json`, updatedList)
        .then(() => {
          const { lists } = this.state;
          const idx = lists.findIndex(list => list.id === updatedList.id);
          lists[idx] = updatedList;
          const { history } = this.props;
          history.push(`/lists/${updatedList.id}`);
          this.setState({ lists });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // bind the list to the component instance and pass it as a prop to the EventForm component

  render() {
    const { lists } = this.state;
    if (lists === null) return null;

    const { match } = this.props;
    const listId = match.params.id;
    const list = lists.find(e => e.id === Number(listId));

    return (
        <div>
          <Header />
          <div className="grid">
            <ListList lists={lists} activeId={Number(listId)} />
            <Switch>
              <PropsRoute path="/lists/new" component={ListForm} onSubmit={this.addList} />
              <PropsRoute
                exact
                path="/lists/:id/edit"
                component={ListForm}
                list={list}
                onSubmit={this.updateList}
            />
              <PropsRoute path="/lists/:id" component={List} list={list} onDelete={this.deleteList}/>
                // when user select a list, pass the list to the list component and display it
          </Switch>
          </div>
        </div>
      );
  }
}

Editor.propTypes = {
    match: PropTypes.shape(),
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
  
Editor.defaultProps = {
  match: undefined,
};

export default Editor;