import React, { Component, Fragment } from 'react'
import SchoolDetails from "./SchoolDetails.js"
import Bookmark from './Bookmark.js'
import axios from 'axios';

class School extends Component {
  constructor() {
    super();
    this.state = {
      bookmarked: false,
      schoolMoreInfo:{},
      modalStatus: 'close'

    }
  }

  addNote = (id) => {
    this.props.setBookmarkState(id)
  }

  closeMe = () => {
    this.setState({
      modalStatus: 'close'
    })
  }
  
  moreInfo = (id) => {
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
      console.log(res)
      // console.log(res.data.response.venue);
      const schoolMoreInfo = res.data.response.venue;

      this.setState({
        // schoolPhotoUrl  :`${schoolDetails.bestPhoto.prefix}500x500${schoolDetails.bestPhoto.suffix}`,
        // schoolName :schoolDetails.name,
        // schoolAddress: schoolDetails.location.formattedAddress,
        schoolMoreInfo: schoolMoreInfo,
        modalStatus: 'open'

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

  render() {
    return (
      <Fragment>

      
      <div className="schoolsList container" aria-live="polite">
        {this.props.schoolsList.length ? this.props.schoolsList.map(school => {
          const { id, name: schoolName, location } = school;
          const { address, city, country } = location;

          return (
            <div key={id} className="result">
              <p className="resultName">{schoolName}</p>
              <p className="resultAddress">{address} - {city}</p>
              <p className="resultCountry">{country}</p>
              <div className="bookmarkPosition">
                {/* <button className='bookmark' onClick={() => { this.addNote(id) }}><i className="far fa-bookmark"></i></button> */}
                <Bookmark bookmarkId={id} onClick={this.addNote}/>
              </div>
              <button onClick={() => this.moreInfo(id)}>More Info</button>
            </div>
          )
        }) : null}
      </div>
      <SchoolDetails 
        schoolMoreInfo={this.state.schoolMoreInfo}
        modalStatus={this.state.modalStatus}
        closeMe={this.closeMe}
        />
      </Fragment>
    )
  }
}

export default School
