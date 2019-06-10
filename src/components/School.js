import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button"; //Add this line Here

import SchoolDetails from "./SchoolDetails.js"
import Bookmark from './Bookmark.js'

class School extends Component {
  constructor() {
    super();
    this.state = {
      bookmarked: false,
      schoolMoreInfo: {},
      modalStatus: 'close',
      // array of keys to loop through for more details  
      clientID: ['JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY', 'FIQECXQNZC4NEV00SFTF3535BMLFZSUW2XXHXEERFGTTCJDG', 'CJ4XSVLTY1JQ3SPHZV00JRFHCFAIXO5Y1HAASCOPGXG3URXV', 'MATE2LSJXUO3JS3LXR1NMMTSUE1PGF15ADCMGRUA23UCVVDM', 'QZIM15RPPGTGIA5QB0NA3ZMK3UUOSR1GU12SJLQG1MOYRNPA', 'NJZBAFQGJBCPNIDWS2FJ4OC1SCXB34QCAFPVJDDBKU2GANFO', 'VGQEXUC1OBLYR2OGNSCLDDA0Z3V1XYT35BVUR5KXOZ2SER5A', 'WWHHWA0S4GFHODY54K2FZS5XP1YROPRBPDRVG31MUMNGKDMM', '2NFNP2CN0KXN5G0INYBVQZOZUIC0D3XT0FOZXZRPVQN4GZZA', 'VMT1CVWVRRTVEEOJWSER3UPCWUKR11INNAGCYRFDVGNCT4Y5', 'SUXPJ05HNSW0NCIBMJJ2SHHA3DJMYBLM4FVFPOG5Y1TA3VC1', 'SSZTT4XQDRSNJDAJVQTNGBUSM1ABD32WT1VG3C5Z1XND33H2', 'EI1UC5BD2LNXQGTNN4SW0DZMDI5W3QNQ3A4ZNCEWP54ZSY0JClient'],

      clientSecret: ['XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3', 'EQZ42P3U5DO5PVOQVKG4AQFEDUAPVQ4ZTIOEDDLMER2EJFJX', 'WUABEMQMIZBR2LSKFURNG4NY2IF10CDAPAX0QSWWYGFGV2ZP', 'SZRKDMSYSFHU23FQLJR4VXRLHBBQQC1MLJCKSACB5A2EVGPS', 'VUM2WEQ55KAX3405NTCPFR145DKCD3FUS5YM0GWNJYXEJGA2', 'HBFVKQJJDP4HLH0F4DG15DMXRV1GMOMH0LTIFSMFMYYLGNFB', '3TNU5JJ4EPOKSBEHMLUXJTXBUJTFNRYG5EO203ITHUAHOO5C', 'DV2P4N505ZWOEGEZQUCDQ0FV5OJ3HDW1RVL44VQQYCNC13QW', '5EWVDITYF2KCEB4ZHY32TN0XV31ONYEDXX5A1YMPDBMBHLIC', '3XQL24IHR2TIODEGQ5WH0CW03K3E2G4OCR4VAORZ23CNHZRO', '0KKBUXNYC4HWALSJTL2UA0QGZJQQ5X0UOZIPK5ROL03RPPZA', 'KMO0VYQBDDXMGZ2QM4BJIFB2D0TB0ZMCEWE3LW1KBO2LIIH2', 'D50NHW2CPNKH1I3APUMVBT4XON33QK3HLW225P5N023MXL4O'],

      keyCounter: 0,
      moreInfoID: null,

      userSearch: '',
      schoolsList: []
    }
  }

  componentWillReceiveProps(props) {
    // sets the state with the schools list that was passed down as prop
    this.setState({
      schoolsList: props.schoolsList
    })
  }

  addNote = (id) => {
    this.props.setBookmarkState(id)
  }

  closeMe = () => {
    this.setState({
      modalStatus: 'close'
    })
  }
  
  // make API call for more info
  moreInfo = (id) => {
    // stores the ID in the event this moreInfo function needs to be called again from increased key count
    this.setState({
      moreInfoID: id
    })

    axios.get(`https://api.foursquare.com/v2/venues/${id}`, {
      params: {
        // gets the id and secret from the state
        client_id: this.state.clientID[this.state.keyCounter],
        client_secret: this.state.clientSecret[this.state.keyCounter],
        v: 20190101,
      }
    }).then(res => {
      const schoolMoreInfo = res.data.response.venue;

      this.setState({
        schoolMoreInfo: schoolMoreInfo,
        modalStatus: 'open'
      })
      
    }).catch((error) => {
      // if the response error is status 429
      if (error.response.status === 429) {
        
        if (this.state.keyCounter < this.state.clientID.length  - 1) {
          // increase the key counter by one step
          this.setState({
            keyCounter: this.state.keyCounter + 1
          }, () => {
  
              // call the more info function again using the key new key count in state
              this.moreInfo(this.state.moreInfoID)
          })
        } else {
          this.setState({
            keyCounter: 0
          })
        }
      }

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

  // filter results based on change
  handleChange = e => {    
    this.setState({
      userSearch: e.target.value
    })

    // if the search query is empty or null reverts to the master list from props
    if (e.target.value === '' || e.target.value === null) {    
      this.setState({
        schoolsList: this.props.schoolsList
      })
    } else {
      // search the list for the string
      const schoolsList = this.props.schoolsList.filter(school => {
        return (school.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
      })

      this.setState({
        schoolsList
      });
    }
  }

  render() {
    return (
      <Fragment>

        <div className="schoolResults wrapper" aria-live="polite">
          <ScrollUpButton
            AnimationDuration={500}
            ShowAtPosition={350}
            style={{
              fill: `#073330`,
              height: 30,
              width: 30,
              right: 15,
              border: `3px solid #073330`,
              background: `rgba(255, 255, 255, 0.848)`,
            }}
          />
        {/* only display the filter when a list of schools is returned */}
        {this.state.schoolsList.length > 0 ?
            <div className="schoolsListSearchInput singleContent">
            <label htmlFor="schoolsListSearch">Filter Search:</label>
            <input
              type="text"
              placeholder="search"
              name="userSearch"
              value={this.state.userSearch}
              id="schoolsListSearch"
              className="schoolsListSearch"
              onChange={this.handleChange}
            />
          </div>
          : null
        }

        <div className="schoolsList">
          {/* checks if the school list is an array otherwise prints a string */}
          {Array.isArray(this.state.schoolsList) ? this.state.schoolsList.map(school => {
            const { id, name: schoolName, location } = school;
            const { address, city, country } = location;

            return (
              <div key={id} className="result singleContent">
                <p className="resultName">{schoolName}</p>
                <p className="resultAddress">{address} - {city}</p>
                <p className="resultCountry">{country}</p>
                
                <Bookmark bookmarkId={id} addNote={this.addNote}/>
                
                <button className="generalButton" onClick={() => this.moreInfo(id)}>More Info</button>
              </div>
            )
            }) :
            // error message returned if an arrary of schools isn't returned from the API call
            <div className="noResult singleContent">
              <p className="resultName">{this.props.schoolsList}</p>
            </div>
          }
        </div>

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
