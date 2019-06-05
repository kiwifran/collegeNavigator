import React, { Component } from 'react'
import Footer from "./components/Footer"
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search.js';

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
      isModalOpen: false,
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

  isInfoEmpty = () => {
    for (let key in this.state.schoolMoreInfo) {
      return false;
    }
    return true;
  }
  displayDetails = () => {
    const { bestPhoto, name, contact, location, description, url } = this.state.schoolMoreInfo;
    console.log(bestPhoto);
    return (
      <div className="modalWrapper">
        <div className="detailsOverlay"></div>
        <div className="detailsModal">
          <div className="detailsFlex">
            <button onClick={this.handleCloseClick} className="closeButton">
              <i className="fas fa-times"></i>
            </button>
            <div className="bookmarkOff">
              <i className="far fa-bookmark"></i>
            </div>
            {bestPhoto !== undefined
              ? <div className="imgWrapper">
                {/* since I see some photos are not as large as the size of 500x500 I changed it to 400 */}
                <img src={`${bestPhoto.prefix}400x400${bestPhoto.suffix}`} alt={`picture of ${name}`} />
              </div>
              : null}
            <div className="smallInfoWrapper">
              <p>{name}</p>
              <p>{location.formattedAddress}</p>
              {(contact.twitter !== undefined && contact.facebook !== undefined)
                ? <div className="contacts">
                  <p>{contact.twitter}</p>
                  <p>{contact.facebook}</p>
                  <p>{contact.formattedPhone}</p>
                </div>
                : (contact.twitter === undefined && contact.facebook !== undefined)
                  ? <div className="contacts">
                    <p>{contact.facebook}</p>
                    <p>{contact.formattedPhone}</p>
                  </div>
                  : (contact.twitter !== undefined && contact.facebook === undefined)
                    ? <div className="contacts">
                      <p>{contact.twitter}</p>
                      <p>{contact.formattedPhone}</p>
                    </div>
                    : <div className="contacts">
                      <p>{contact.formattedPhone}</p>
                    </div>}

            </div>
            <div className="descriptionWrapper">
              {description !== undefined
                ? <p>{description}</p>
                : null}
              {url !== undefined
                ? <a href={url}>Visit Website </a>
                : null}
            </div>
            {/* end of wrappers */}
          </div>
        </div>
      </div>

    )
  }
  // openClose=(value)=>{
  //   const modal = document.querySelector(".modalWrapper");

  //   if(value===false) {
  //     modal.classList.add("close");

  //   }else {
  //     modal.classList.remove("close");
  //   }
  // }
  handleCloseClick = () => {
    this.setState = ({
      isModalOpen: false,
    })
    // not sure do we need to setState here
    // const modal = document.querySelector(".modalWrapper");
    // modal.classList.add("close");
    console.log('clicked!');


  }

  moreInfo(id) {
    console.log(id);
    axios.get(`https://api.foursquare.com/v2/venues/${id}`, {
      params: {
        // THIS IS ANDREW'S API KEY 
        //then it's Frankie's
        // client_id: 'JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY',
        client_id: 'H5KTLRAURYRNV350DJHQNDMORMYO0GN3KP12FFUMTXWI2XCO',
        // client_secret: 'XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3',
        client_secret: 'XIFGNZS4EZHSNJD2U45HSDMBUGTW4TEF5RKK3BZBW3V4R5NB',
        v: 20190101,
      }
    }).then(res => {
      console.log(res.data.response.venue);
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

  render() {
    return (
      <HashRouter>
        <Nav />
        <Search onClick={this.handleClick} onChange={this.handleChange} getInstitute={this.getInstitute} />

        <div className="schoolsList container">
          {this.state.schoolsList.length > 0 ? this.state.schoolsList.map(school => {
            return (
              <School
                key={school.id}
                id={school.id}
                schoolName={school.name}
                address={school.location.address}
                city={school.location.city}
                country={school.location.country}
                moreInfo={this.moreInfo}
              />
            )
          }) : null}
        </div>

        <AddSchool
          addInstitution={this.addInstitution}
        />

        <Switch>
          <Route path='/notes' component={Notes} />
        </Switch>
        <Footer />
      </HashRouter>
    )
  }
}
export default App;
