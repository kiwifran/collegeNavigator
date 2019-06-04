import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';

import './styles/style.scss';

import Nav from './components/Nav.js';
import Search from './components/Search.js';
import Notes from './components/Notes.js';


class App extends Component {
  
  render() {
    return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route exact path='/' component={Search} />
          <Route path='/notes' component={Notes} />
        </Switch>
      </HashRouter>
    )
  }
}
export default App;
