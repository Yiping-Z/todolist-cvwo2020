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

  componentDidMount() {
    axios
      .get('/api/lists.json')
      .then(response => this.setState({ lists: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  
  addList(newList) {
    axios
      .post('/api/lists.json', newList)
      .then((response) => {
        alert('List Added!');
        const savedList = response.data;
        this.setState(prevState => ({
          lists: [...prevState.lists, savedList],
        }));
        const { history } = this.props;
        history.push(`/lists/${savedList.id}`);
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
              alert('List deleted');
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
          alert('List updated');
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
  render() {
    const { lists } = this.state;
    if (lists === null) return null;

    const { match } = this.props;
    const listId = match.params.id;
    const list = lists.find(t => t.id === Number(listId));

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