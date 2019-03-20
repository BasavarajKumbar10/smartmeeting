import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Dashbooard from './containers/Dashboard/Dashboard'
import AddMeeting from './containers/AddMeeting/AddMeeting'



class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path="/addmeeting" exact component={AddMeeting} />
            <Route path="/" component={Dashbooard} />
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
