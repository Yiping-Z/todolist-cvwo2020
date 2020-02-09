import React from 'react';
import { Route } from 'react-router-dom';
import Editor from './Editor';

const App = () => (
  <div>
    <Route path="/lists/:id?" component={Editor} />
  </div>
);
// render the browser's URL which matches the route's path, optional :id

export default App;