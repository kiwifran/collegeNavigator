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
      userInstitute: '',
      userInput: '',
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
        radius: 25000,
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
    }).catch((error) => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }
  
  handleChange = (event) => {
    this.setState({
      userInput: event.currentTarget.value
    })
  }

  getInstitute = (event) => {
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
