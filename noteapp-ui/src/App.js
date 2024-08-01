import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Notes from './components/Notes';

function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/notes" component={Notes} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;