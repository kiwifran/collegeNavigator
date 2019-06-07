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
      modalStatus: 'close',
      clientID: ['JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY', 'FIQECXQNZC4NEV00SFTF3535BMLFZSUW2XXHXEERFGTTCJDG', 'CJ4XSVLTY1JQ3SPHZV00JRFHCFAIXO5Y1HAASCOPGXG3URXV', 'MATE2LSJXUO3JS3LXR1NMMTSUE1PGF15ADCMGRUA23UCVVDM', 'QZIM15RPPGTGIA5QB0NA3ZMK3UUOSR1GU12SJLQG1MOYRNPA', 'NJZBAFQGJBCPNIDWS2FJ4OC1SCXB34QCAFPVJDDBKU2GANFO', 'VGQEXUC1OBLYR2OGNSCLDDA0Z3V1XYT35BVUR5KXOZ2SER5A', 'WWHHWA0S4GFHODY54K2FZS5XP1YROPRBPDRVG31MUMNGKDMM', '2NFNP2CN0KXN5G0INYBVQZOZUIC0D3XT0FOZXZRPVQN4GZZA', 'VMT1CVWVRRTVEEOJWSER3UPCWUKR11INNAGCYRFDVGNCT4Y5', 'SUXPJ05HNSW0NCIBMJJ2SHHA3DJMYBLM4FVFPOG5Y1TA3VC1', 'SSZTT4XQDRSNJDAJVQTNGBUSM1ABD32WT1VG3C5Z1XND33H2', 'EI1UC5BD2LNXQGTNN4SW0DZMDI5W3QNQ3A4ZNCEWP54ZSY0JClient'],

      clientSecret: ['XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3', 'EQZ42P3U5DO5PVOQVKG4AQFEDUAPVQ4ZTIOEDDLMER2EJFJX', 'WUABEMQMIZBR2LSKFURNG4NY2IF10CDAPAX0QSWWYGFGV2ZP', 'SZRKDMSYSFHU23FQLJR4VXRLHBBQQC1MLJCKSACB5A2EVGPS', 'VUM2WEQ55KAX3405NTCPFR145DKCD3FUS5YM0GWNJYXEJGA2', 'HBFVKQJJDP4HLH0F4DG15DMXRV1GMOMH0LTIFSMFMYYLGNFB', '3TNU5JJ4EPOKSBEHMLUXJTXBUJTFNRYG5EO203ITHUAHOO5C', 'DV2P4N505ZWOEGEZQUCDQ0FV5OJ3HDW1RVL44VQQYCNC13QW', '5EWVDITYF2KCEB4ZHY32TN0XV31ONYEDXX5A1YMPDBMBHLIC', '3XQL24IHR2TIODEGQ5WH0CW03K3E2G4OCR4VAORZ23CNHZRO', '0KKBUXNYC4HWALSJTL2UA0QGZJQQ5X0UOZIPK5ROL03RPPZA', 'KMO0VYQBDDXMGZ2QM4BJIFB2D0TB0ZMCEWE3LW1KBO2LIIH2', 'D50NHW2CPNKH1I3APUMVBT4XON33QK3HLW225P5N023MXL4O'],

      keyCounter: 0,
      moreInfoID: null
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
        // schoolPhotoUrl  :`${schoolDetails.bestPhoto.prefix}500x500${schoolDetails.bestPhoto.suffix}`,
        // schoolName :schoolDetails.name,
        // schoolAddress: schoolDetails.location.formattedAddress,
        schoolMoreInfo: schoolMoreInfo,
        modalStatus: 'open'

      })
    }).catch((error) => {
      // if the response error is status 429
      if (error.response.status === 429) {
        // increase the key counter by one step
        this.setState({
          keyCounter: this.state.keyCounter + 1
        }, () => {

            // call the more info function again using the key new key count in state
            this.moreInfo(this.state.moreInfoID)
        })
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

  render() {
    return (
      <Fragment>

      <div className="schoolsList container" aria-live="polite">
        {Array.isArray(this.props.schoolsList) ? this.props.schoolsList.map(school => {
          const { id, name: schoolName, location } = school;
          const { address, city, country } = location;

          return (
            <div key={id} className="result">
              <p className="resultName">{schoolName}</p>
              <p className="resultAddress">{address} - {city}</p>
              <p className="resultCountry">{country}</p>
              
                {/* <button className='bookmark' onClick={() => { this.addNote(id) }}><i className="far fa-bookmark"></i></button> */}
                <Bookmark bookmarkId={id} addNote={this.addNote}/>
              
              <button onClick={() => this.moreInfo(id)}>More Info</button>
            </div>
          )
        }) : 
          <div className="result">
            <p className="resultName">No Results To Display</p>
          </div>}
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
