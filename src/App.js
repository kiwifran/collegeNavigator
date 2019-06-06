import React, { Component } from 'react'
import Footer from "./components/Footer"
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import firebase from './components/firebase';
import Search from './components/Search.js';
import SchoolDetails from "./components/SchoolDetails.js"
import './styles/style.scss';

import Nav from './components/Nav.js';
import Notes from './components/Notes.js';
import School from './components/School.js';
import AddSchool from './components/AddSchool.js'


class App extends Component {
  constructor() {
    super();

    this.state = {
      userInstitute: '',
      userInput: '',
      university: '4bf58dd8d48988d1ae941735',
      college: '4bf58dd8d48988d1a2941735',
      trade: '4bf58dd8d48988d1ad941735',
      schoolsList: [],
      schoolMoreInfo: {},
      bookmarkName: '',
      bookmarkAddress: '',
      bookmarkId: '',
      bookmarkList: []
      // schoolPhotoUrl:"",
      // schoolName:"",
      // schoolAddress:"",
      // schoolDescription:"",
      // schoolWebsite:""

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
      const regex = /centre|center|park|building|pool|hall|office of le president|division of|department|campus|residence|faculty|campus|public/i
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
        schoolsList: filteredSchoolList,
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

  
  moreInfo = (id) => {
    console.log(id);
    axios.get(`https://api.foursquare.com/v2/venues/${id}`, {
      params: {
        // THIS IS ANDREW'S API KEY 
        // client_id: 'H5KTLRAURYRNV350DJHQNDMORMYO0GN3KP12FFUMTXWI2XCO',
        // client_secret: 'XIFGNZS4EZHSNJD2U45HSDMBUGTW4TEF5RKK3BZBW3V4R5NB',

        //then it's Frankie's
        // client_id: 'JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY',
        // client_secret: 'XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3',

        //Jasmine
        client_id: 'CJ4XSVLTY1JQ3SPHZV00JRFHCFAIXO5Y1HAASCOPGXG3URXV',
        client_secret: 'WUABEMQMIZBR2LSKFURNG4NY2IF10CDAPAX0QSWWYGFGV2ZP',
        v: 20190101,
      }
    }).then(res => {
      // console.log(res.data.response.venue);
      const schoolMoreInfo = res.data.response.venue;

      this.setState({
        // schoolPhotoUrl  :`${schoolDetails.bestPhoto.prefix}500x500${schoolDetails.bestPhoto.suffix}`,
        // schoolName :schoolDetails.name,
        // schoolAddress: schoolDetails.location.formattedAddress,
        schoolMoreInfo: schoolMoreInfo,
        isModalOpen: true

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

  addInstitution(schoolInfo) {
    // schoolInfo is an object containing a name, address and desciption
    console.log(schoolInfo);

    // pass the info into firebase here
  }


  // pull bookmarked item's name, address and id from school component into parent state
  setBookmarkState = (bookmarkName, bookmarkAddress, bookmarkId) => {
    this.setState({
      bookmarkName,
      bookmarkAddress,
      bookmarkId
    })
  // push each bookmarked item into firebase
    const dbRef = firebase.database().ref();
    dbRef.push({
      name: bookmarkName,
      address: bookmarkAddress,
      id: bookmarkId
    });
  }
  // if new data pushed to firebase, create array holding all the new data
  // set the data into the bookmarkList state
  // will use this state to add the notes
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const data = response.val();
      const updateBookmark = [];
      for (let item in data) {
        updateBookmark.push({
          key: item,
          name: data[item].name,
          address: data[item].address,
          id: data[item].id
        })
      }
      this.setState({
        bookmarkList: updateBookmark
      })
    })
  }
  removeNote = (key) => {
    const dbRef = firebase.database().ref(key);
    dbRef.remove();
  }

  render() {
    return (
      <HashRouter>
        <Nav />
        <Search onClick={this.handleClick} onChange={this.handleChange} getInstitute={this.getInstitute} />

        <School 
          schoolsList={this.state.schoolsList}
          moreInfo={this.moreInfo}
          bookmarkName={this.state.bookmarkName}
          bookmarkAddress={this.state.bookmarkAddress}
          bookmarkId={this.state.bookmarkId}
          setBookmarkState={this.setBookmarkState}
        />

        <AddSchool 
          addInstitution={this.addInstitution}  
        />

        <Switch>
          <Route path='/notes' render={() => {return (<Notes 
            bookmarkList={this.state.bookmarkList}
            removeNote={this.removeNote} />)}} 
          />
        </Switch>
        <SchoolDetails schoolMoreInfo={this.state.schoolMoreInfo}/>
        <Footer />
      </HashRouter>
    )
  }
}
export default App;
