import React, { Component } from 'react';
import firebase from './firebase.js';
import jump from 'jump.js';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';

import AddSchool from './AddSchool.js';

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      bookmarkList: [],
      userNote: '',
      userName: '',
      userAddress: '',
      userCategory: '',
      modalOpen: 'close',
      selectedId: '',
    }
  }

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
          id: data[item].id,
          note: data[item].note,
          category: data[item].category
        })
      }
      this.setState({
        bookmarkList: updateBookmark
      })
    })
  }

  // handle change for form
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  // handle submit of form
  editNote = (key) => {
    const found = this.state.bookmarkList.find(item => item.key === key);
    this.setState({
      modalOpen: 'open',
      selectedId: key,
      userName: found.name,
      userAddress: found.address,
      userNote: found.note,
      userCategory: found.category
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref(this.state.selectedId);

    if (this.state.userName !== '') {
      dbRef.child('name').set(this.state.userName);
    }
    if (this.state.userAddress !== '' ) {
      dbRef.child('address').set(this.state.userAddress);
    }
    if (this.state.userCategory !== '' ){
      dbRef.child('category').set(this.state.userCategory);
    }
    if (this.state.userNote !== '' && this.state.userNote !== undefined ) {
      dbRef.child('note').set(this.state.userNote);
    }
    this.closeModal();

    this.setState({
      userNote: '',
      userAddress: '',
      userName: '',
      userCategory: ''
    })
  }

  // edit note function
  editNote = (key) => {
    const found = this.state.bookmarkList.find(item => item.key === key);
    this.setState({
      modalOpen: 'open',
      selectedId: key,
      userName: found.name,
      userAddress: found.address,
      userNote: found.note, 
      userCategory: found.category

    })
  }

  // remove the note function from the database
  removeNote = (key) => {
    const dbRef = firebase.database().ref(key);
    dbRef.remove();
  }

  // close modal
  closeModal = () => {
    this.setState({
      modalOpen: 'close'
    })
  }


  // jump scroll
  handleScroll = () => {
    jump('.inputSchoolForm', {
      duration: 1000,
      a11y: true
    })
  }

  render() {
    return (
      <div className="noteContainer">
        <div className="wrapper">
          <div className="bookmarks">
            <h2>BOOKMARKS</h2>
          </div>
          <button onClick={this.handleScroll} className="addSign">
            <i className="fas fa-plus"></i>
            <p>Add Institution</p>
          </button>
        </div>
        
        <div className={`modalWrapper ${this.state.modalOpen}`}>
          <div className="detailsOverlay"></div>

          <div className="detailsModal">
            {/* close modal button */}
            <button onClick={this.closeModal} className="closeButton">
              <i className="fas fa-times" aria-label="close modal"></i>
            </button>

            <form action="" className="editForm" onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name of Institution:</label>
              <input type="text" id="name" name="userName" onChange={this.handleChange} value={this.state.userName} />

              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="userAddress" onChange={this.handleChange} value={this.state.userAddress} />

              <fieldset className="inputFieldContainerRadio">
                <legend className="visuallyHidden">Category:</legend>

                <input
                  className="radioButtonDot"
                  type="radio"
                  name="userCategory"
                  id="college"
                  value="College"
                  onChange={this.handleChange}
                />
                <label htmlFor="college">College</label>
                <input
                  className="radioButtonDot"
                  type="radio"
                  name="userCategory"
                  id="university"
                  value="University"
                  onChange={this.handleChange}
                />
                <label htmlFor="university">University</label>
                <input
                  className="radioButtonDot"
                  type="radio"
                  name="userCategory"
                  id="tradeSchool"
                  value="Trade School"
                  onChange={this.handleChange}
                />
                <label htmlFor="tradeSchool">Trade School</label>
              </fieldset>

              <label htmlFor="addNote" >Add Note</label>
              <textarea onChange={this.handleChange} value={this.state.userNote} name="userNote"></textarea>
              
              <input className="generalButton" type="submit" value="enter" />
            </form>
          </div>
        </div>
        <div className="notes wrapper">
          {this.state.bookmarkList.map((item) => {
            return (
              <div key={item.key} className="singleNote singleContent">
                <div className="textWrapper">
                  <p className="schoolName">Institution: {item.name}</p>
                  <p className="address"> Address: {item.address}</p>
                  <p className="category">Category: {item.category}</p>
                  <p className="note"> Note: {item.note}</p>
                </div>
                

                <button className="generalButton" onClick={() => { this.editNote(item.key) }}>
                  <i className="fas fa-pen" aria-hidden="true"></i>Edit
                </button>
                
                <button className="generalButton" onClick={() => { this.removeNote(item.key) }}>
                  <i className="fas fa-trash-alt" aria-hidden="true"></i>Delete
                </button>
              </div>
            )
          })}

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
        </div>
        
        <AddSchool />
      </div>
    )
  }
}

export default Notes
