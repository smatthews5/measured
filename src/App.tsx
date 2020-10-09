import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import Home from './pages/Home';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Home path="/" />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));