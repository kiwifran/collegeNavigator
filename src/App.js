import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom';
import './styles/style.scss';

// imported components
import Search from './components/Search.js';
import Nav from './components/Nav.js';
import Notes from './components/Notes.js';
import Footer from "./components/Footer"

class App extends Component {

  render() {
    return (
      // hashrouter for gh-pages
      <HashRouter>
        <Nav />
        <Route exact path="/" component={Search} />
        <Route path='/notes' component={Notes} />
        <Footer />
      </HashRouter>
    )
  }
}

export default App;
