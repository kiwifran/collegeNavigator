import React, { Component, Fragment } from 'react';
import axios from 'axios';
import firebase from './firebase.js';
import jump from 'jump.js';
import swal from 'sweetalert';

import School from './School.js';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      // input from search field
      userInput: '',
      // input for the type of school (college, university, trade school)
      institution: '',
      // specific id for more info about each school
      selectSchoolId: '',
      // return from the API
      schoolsList: []
    };
  }

  // calls the API
  apiCall = () => {
    axios
      .get('https://api.foursquare.com/v2/venues/search', {
        params: {
          client_id: 'JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY',
          client_secret: 'XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3',
          v: 20190601,
          near: this.state.userInput,
          categoryId: this.state.institution,
          // 25 km centre of city search
          radius: 25000,
          // checkin method returns most popular places
          intent: 'checkin',
          // max number of results that can be returned from api
          limit: 50
        }
      })
      .then(result => {
        // RegEx test to filter out undesirable items returned in search
        const RegEx = /centre|center|park|building|pool|hall|office of le president|division of|department|campus|residence|faculty|campus|public|room/i;

        // response returned from API
        const schoolsList = result.data.response.venues;

        // filter out only relevant information from the API using RegEx
        const filteredList = schoolsList.filter(key => {
          const name = key.categories[0].shortName;

          return (
            (name === 'University' || name === 'Community College' || name === 'Trade School') &&
            !RegEx.test(key.name) &&
            key.location.address !== undefined
          );
        });

        this.setState({
          schoolsList: filteredList
        });
      })
      .catch(error => {
        // error message if no results are returned
        if (error.response.status === 400) {
          this.setState({
            schoolsList: `We're sorry. There are zero results for your search.`
          });

          // if the user ends up somehow making more 950 calls a day
        } else if (error.response.status === 429) {
          this.setState({
            schoolsList:
              'You have exceeded your daily limit of searches. You should probably go outside...'
          });
        }
      });
  };

  // bookmark a school
  setBookmarkState = id => {
    // goes through the school list array to find the corresponding info of the selected ID and add to firebase
    this.state.schoolsList.forEach(school => {
      if (school.id === id) {
        const dbRef = firebase.database().ref();
        dbRef.push({
          name: school.name,
          address: school.location.address,
          id: school.id,
          category: school.categories[0].name
        });
      }
    });
  };

  // handle change for form
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handle submit of form
  handleSubmit = e => {
    // check if all fields are entered
    if (this.state.institution.length === 0 || this.state.userInput.length === 0) {
      swal({
        title: 'oops',
        text: 'please make sure all fields are entered',
        icon: 'warning'
      });
    } else {
      // RegEx test to make sure user can't submit a blank spaces as a search
      if (/^\s*$/.test(this.state.userInput) === false) {
        this.apiCall();

        jump('.schoolResults', {
          duration: 1000,
          offset: -50,
          a11y: true
        });
      } else {
        swal({
          title: 'oops',
          text: 'please enter a search',
          icon: 'warning'
        });
      }
    }

    e.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <div className="searchContainer">
          <form onSubmit={this.handleSubmit} className="searchForm wrapper">
            <div className="smallWrapper">
              <div className="instructions">
                <p>Search for a school near you!</p>
                <p>(Select an Institution Type)</p>
              </div>
              <div className="radioButtons">
                <input
                  type="radio"
                  name="institution"
                  id="university"
                  className="radioButtonDot"
                  value="4bf58dd8d48988d1ae941735"
                  onChange={this.handleChange}
                  checked={this.state.institution === '4bf58dd8d48988d1ae941735'}
                  tabIndex="4"
                />
                <label className="radioButtonLabel" htmlFor="university">
                  University
                </label>

                <input
                  type="radio"
                  name="institution"
                  id="college"
                  className="radioButtonDot"
                  value="4bf58dd8d48988d1a2941735"
                  onChange={this.handleChange}
                  checked={this.state.institution === '4bf58dd8d48988d1a2941735'}
                  tabIndex="4"
                />
                <label className="radioButtonLabel" htmlFor="college">
                  College
                </label>

                <input
                  type="radio"
                  name="institution"
                  id="trade"
                  className="radioButtonDot"
                  value="4bf58dd8d48988d1ad941735"
                  onChange={this.handleChange}
                  checked={this.state.institution === '4bf58dd8d48988d1ad941735'}
                  tabIndex="4"
                />
                <label className="radioButtonLabel" htmlFor="trade">
                  Trade School
                </label>
              </div>

              <label className="userInputLabel" htmlFor="search">
                Schools Near:
              </label>
              <input
                className="userInput"
                type="text"
                name="userInput"
                id="search"
                onChange={this.handleChange}
                value={this.state.userInput}
                tabIndex="5"
                placeholder="enter a city"
              />

              <label htmlFor="submit" className="visuallyHidden">
                Submit Search
              </label>
              <input
                className="generalButton"
                type="submit"
                id="submit"
                value="Get Schools List"
                tabIndex="6"
              />
            </div>
          </form>
        </div>

        {/* returned results from the api call */}
        <School
          schoolsList={this.state.schoolsList}
          setBookmarkState={this.setBookmarkState}
          userSelectSchoolId={this.userSelectSchoolId}
        />
      </Fragment>
    );
  }
}

export default Search;
