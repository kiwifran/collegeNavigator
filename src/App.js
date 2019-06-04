import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './styles/style.scss';

import Nav from './components/Nav.js';
import Notes from './components/Notes.js';


class App extends Component {
  constructor() {
    super();

    this.state = {
      university: '4bf58dd8d48988d1ae941735',
      college: '4bf58dd8d48988d1a2941735',
      trade: '4bf58dd8d48988d1ad941735'
    }
  }

  handleClick = () => {
    axios.get('https://api.foursquare.com/v2/venues/search', {
      params: {

        // THIS IS ANDREW'S API KEY
        client_id: 'JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY',
        client_secret: 'XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3',
        v: 20190101,
        near: 'Toronto',

        // categoryID hardcoded currently for university
        categoryId: this.state.university,
        radius: 250000,
        intent: 'checkin',
        limit: 50,
        query: 'university'
      }
    }).then(result => {
      // this returns an array of 50 schools
      const schoolsList = result.data.response.venues

      console.log(schoolsList)

    })
  }  

  render() {
    return (
      <HashRouter>
        <Nav />
        <button onClick={this.handleClick}>Get School List</button>

        <Switch>
          <Route path='/notes' component={Notes} />
        </Switch>
      </HashRouter>
    )
  }
}
export default App;
