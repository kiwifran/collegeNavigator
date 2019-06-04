import React, { Component } from 'react'
import Footer from "./components/Footer"
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search.js';

import './styles/style.scss';

import Nav from './components/Nav.js';
import Notes from './components/Notes.js';


class App extends Component {
  constructor() {
    super();

    this.state = {
      // university: '4bf58dd8d48988d1ae941735',
      // college: '4bf58dd8d48988d1a2941735',
      // trade: '4bf58dd8d48988d1ad941735',
      userInstitute: '',
      userInput: ''
      university: '4bf58dd8d48988d1ae941735',
      college: '4bf58dd8d48988d1a2941735',
      trade: '4bf58dd8d48988d1ad941735',
      schoolsList: []
    }
  }

  handleClick = () => {
    axios.get('https://api.foursquare.com/v2/venues/search', {
      params: {

        // THIS IS ANDREW'S API KEY
        client_id: 'JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY',
        client_secret: 'XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3',
        v: 20190101,
        near: this.state.userInput,

        // categoryID hardcoded currently for university
        categoryId: this.state.userInstitute,
        radius: 250000,
        intent: 'checkin',
        limit: 50,
        // query: 'university'
      }
    }).then(result => {
      // this returns an array of 50 schools
      const regex = /centre|center|park|building|pool|hall|office of le president|division of|department/i
      const schoolsList = result.data.response.venues
      const filteredSchoolList = [];

      schoolsList.forEach(key => {
        const name = key.categories[0].shortName
        if ((name === 'University' || name === 'Community College' || name === 'Trade School') && !(regex.test(key.name))) {
          filteredSchoolList.push(key)
        }
      })
      console.log(filteredSchoolList)

      this.setState({
        schoolsList
      })
    })
  }
  
  handleChange = (event) => {
    this.setState({
      userInput: event.currentTarget.value
    })
  }

  getInstitute = (event) => {
    console.log(event.target.getAttribute('value'))
    this.setState({
      userInstitute: event.target.getAttribute('value')
    })
  }



  moreInfo(id) {
    console.log(id);
  }

  render() {
    
    return (
      <HashRouter>
        <Nav />

        <Search onClick={this.handleClick} onChange={this.handleChange} getInstitute={this.getInstitute}/>

        <button onClick={this.handleClick}>Get School List</button>

        {this.state.schoolsList.length > 0 ? this.state.schoolsList.map(school => {
          return (
            <div key={school.id} className="result">
              <p className="resultName">{school.name}</p>
              <p className="resultAddress">{school.location.address} - {school.location.city}, {school.location.country}</p>

              <button onClick={() => this.moreInfo(school.id)}>More Info</button>
            </div>)

        }) : null}

        <Switch>
          <Route path='/notes' component={Notes} />
        </Switch>
      <Footer />
      </HashRouter>
    )
  }
}
export default App;
