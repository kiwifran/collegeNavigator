import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom';
import './styles/style.scss';

// imported components
import Search from './components/Search.js';
import Nav from './components/Nav.js';
import Notes from './components/Notes.js';
import Footer from "./components/Footer"

class App extends Component {

  // WE MAY STILL NEED THIs?!?!?!
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.bookmarkName !== this.state.bookmarkName) {
  //     // push each bookmarked item into firebase
  //     const dbRef = firebase.database().ref();
  //     dbRef.push({
  //       name: this.state.bookmarkName,
  //       address: this.state.bookmarkAddress,
  //       id: this.state.bookmarkId
  //     });
  //   }
  // }
  // WE MAY STILL NEED THIs?!?!?!
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

  render() {
    return (
      <HashRouter>
        <Nav />

        <Route exact path="/" 
          component={Search}
          onClick={this.handleClick}
          onChange={this.handleChange}
          getInstitute={this.getInstitute}
        />

        <Route path='/notes' component={Notes}
        />

        <Footer />
      </HashRouter>
    )
  }
}
export default App;
