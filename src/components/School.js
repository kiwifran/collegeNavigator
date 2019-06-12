import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button'; //Add this line Here

import SchoolDetails from './SchoolDetails.js';
import Bookmark from './Bookmark.js';

class School extends Component {
  constructor() {
    super();
    this.state = {
      // state of the bookmark false = doesn't exist in firebase, true = exist in firebase
      bookmarked: false,
      // object returned from the more info api call
      schoolMoreInfo: {},
      // modal class status of close or open to display the modal
      modalStatus: 'close',
      // array of keys to loop through for more details api call as limited to 50
      clientID: [
        'JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY',
        'FIQECXQNZC4NEV00SFTF3535BMLFZSUW2XXHXEERFGTTCJDG',
        'CJ4XSVLTY1JQ3SPHZV00JRFHCFAIXO5Y1HAASCOPGXG3URXV',
        'MATE2LSJXUO3JS3LXR1NMMTSUE1PGF15ADCMGRUA23UCVVDM',
        'QZIM15RPPGTGIA5QB0NA3ZMK3UUOSR1GU12SJLQG1MOYRNPA',
        'NJZBAFQGJBCPNIDWS2FJ4OC1SCXB34QCAFPVJDDBKU2GANFO',
        'VGQEXUC1OBLYR2OGNSCLDDA0Z3V1XYT35BVUR5KXOZ2SER5A',
        'WWHHWA0S4GFHODY54K2FZS5XP1YROPRBPDRVG31MUMNGKDMM',
        '2NFNP2CN0KXN5G0INYBVQZOZUIC0D3XT0FOZXZRPVQN4GZZA',
        'VMT1CVWVRRTVEEOJWSER3UPCWUKR11INNAGCYRFDVGNCT4Y5',
        'SUXPJ05HNSW0NCIBMJJ2SHHA3DJMYBLM4FVFPOG5Y1TA3VC1',
        'SSZTT4XQDRSNJDAJVQTNGBUSM1ABD32WT1VG3C5Z1XND33H2',
        'EI1UC5BD2LNXQGTNN4SW0DZMDI5W3QNQ3A4ZNCEWP54ZSY0JClient'
      ],

      clientSecret: [
        'XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3',
        'EQZ42P3U5DO5PVOQVKG4AQFEDUAPVQ4ZTIOEDDLMER2EJFJX',
        'WUABEMQMIZBR2LSKFURNG4NY2IF10CDAPAX0QSWWYGFGV2ZP',
        'SZRKDMSYSFHU23FQLJR4VXRLHBBQQC1MLJCKSACB5A2EVGPS',
        'VUM2WEQ55KAX3405NTCPFR145DKCD3FUS5YM0GWNJYXEJGA2',
        'HBFVKQJJDP4HLH0F4DG15DMXRV1GMOMH0LTIFSMFMYYLGNFB',
        '3TNU5JJ4EPOKSBEHMLUXJTXBUJTFNRYG5EO203ITHUAHOO5C',
        'DV2P4N505ZWOEGEZQUCDQ0FV5OJ3HDW1RVL44VQQYCNC13QW',
        '5EWVDITYF2KCEB4ZHY32TN0XV31ONYEDXX5A1YMPDBMBHLIC',
        '3XQL24IHR2TIODEGQ5WH0CW03K3E2G4OCR4VAORZ23CNHZRO',
        '0KKBUXNYC4HWALSJTL2UA0QGZJQQ5X0UOZIPK5ROL03RPPZA',
        'KMO0VYQBDDXMGZ2QM4BJIFB2D0TB0ZMCEWE3LW1KBO2LIIH2',
        'D50NHW2CPNKH1I3APUMVBT4XON33QK3HLW225P5N023MXL4O'
      ],

      // key counter to step through keys
      keyCounter: 0,
      // id that corresponds to the selected school for more info
      moreInfoID: null,
      // user input for filtering the school list
      userSearch: '',
      // list that is stored to be filtered over
      schoolsList: []
    };
  }

  componentWillReceiveProps(props) {
    // sets the state with the schools list that was passed down as prop
    this.setState({
      schoolsList: props.schoolsList
    });
  }

  // calls the bookmark state from the parent component
  addBookmark = id => {
    this.props.setBookmarkState(id);
  };

  // changes the modal class name to close it
  closeModal = () => {
    this.setState({
      modalStatus: 'close'
    });
  };

  // make API call for more info
  moreInfo = id => {
    // stores the ID in the event this moreInfo function needs to be called again from increased key count
    this.setState({
      moreInfoID: id
    });

    axios
      .get(`https://api.foursquare.com/v2/venues/${id}`, {
        params: {
          // gets the id and secret from the state
          client_id: this.state.clientID[this.state.keyCounter],
          client_secret: this.state.clientSecret[this.state.keyCounter],
          v: 20190601
        }
      })
      .then(res => {
        const schoolMoreInfo = res.data.response.venue;

        this.setState({
          // sets state with the more info returned from the api
          schoolMoreInfo: schoolMoreInfo,
          // changes modal class so it opens
          modalStatus: 'open'
        });
      })
      .catch(error => {
        // if the response error is status 429
        if (error.response.status === 429) {
          if (this.state.keyCounter < this.state.clientID.length - 1) {
            // increase the key counter by one step
            this.setState(
              {
                keyCounter: this.state.keyCounter + 1
              },
              () => {
                // call the more info function again using the key new key count in state
                this.moreInfo(this.state.moreInfoID);
              }
            );
          } else {
            this.setState({
              keyCounter: 0
            });
          }
        }
      });
  };

  // filter results based on change
  handleChange = e => {
    this.setState({
      userSearch: e.target.value
    });

    // if the search query is empty or null reverts to the master list from props
    if (e.target.value === '') {
      this.setState({
        schoolsList: this.props.schoolsList
      });
    } else {
      // search the list for the string
      const schoolsList = this.props.schoolsList.filter(school => {
        return school.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
      });

      // sets the state with the new filtered school list
      this.setState({
        schoolsList
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="schoolResults wrapper" aria-live="polite">
          {/* component imported react-scroll-up */}
          <ScrollUpButton
            AnimationDuration={500}
            ShowAtPosition={350}
            style={{
              fill: `#073330`,
              height: 30,
              width: 30,
              right: 15,
              border: `3px solid #073330`,
              background: `rgba(255, 255, 255, 0.848)`
            }}
          />
          {/* only display the filter when a list of schools is returned */}
          {this.props.schoolsList.length > 0 ? (
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
          ) : null}

          <ul className="schoolsList" aria-live="polite">
            {/* checks if the school list is an array otherwise prints a string */}
            {Array.isArray(this.state.schoolsList) ? (
              this.state.schoolsList.map(school => {
                const { id, name: schoolName, location } = school;
                const { address, city, country } = location;

                return (
                  <li key={id} className="result singleContent" tabIndex="0" aria-hidden="false">
                    <p className="resultName">{schoolName}</p>
                    <p className="resultAddress">
                      {address} - {city}
                    </p>
                    <p className="resultCountry">{country}</p>

                    <Bookmark bookmarkId={id} addBookmark={this.addBookmark} />

                    <button className="generalButton" onClick={() => this.moreInfo(id)}>
                      More Info
                    </button>
                  </li>
                );
              })
            ) : (
              // error message returned if an arrary of schools isn't returned from the API call
              <li className="noResult singleContent">
                <p className="resultName">{this.props.schoolsList}</p>
              </li>
            )}
          </ul>
        </div>

        {this.state.modalStatus === 'open' ? (
          // modal component to be displayed
          <SchoolDetails
            schoolMoreInfo={this.state.schoolMoreInfo}
            modalStatus={this.state.modalStatus}
            closeModal={this.closeModal}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default School;
