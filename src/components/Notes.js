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
          note: data[item].note
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
  handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref(this.state.selectedId);

    if (this.state.userName !== '') {
      dbRef.child('name').set(this.state.userName);
    }
    if (this.state.userAddress !== '') {
      dbRef.child('address').set(this.state.userAddress);
    }
    if (this.state.userNote !== '') {
      dbRef.child('note').set(this.state.userNote);
    }
    this.closeModal();

    this.setState({
      userNote: '',
      userAddress: '',
      userName: ''
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
      userNote: found.note

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
      <div className="noteContainer wrapper">
        <div className="bookmarks">
          <h2>BOOKMARKS</h2>
        </div>

        {/* add a school button */}
        <button onClick={this.handleScroll} className="addSign">
          <i className="fas fa-plus" aria-hidden="true"></i>
          <p>Add Institution</p>
        </button>

        {/* modal */}
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

              <label htmlFor="addNote" >Add Note</label>
              <textarea onChange={this.handleChange} value={this.state.userNote} name="userNote"></textarea>
              <input className="generalButton" type="submit" value="enter" />
            </form>
          </div>
        </div>
        {/* modal ends */}

        <div className="notes">
          {this.state.bookmarkList.map((item) => {
            return (
              <div key={item.key} className="singleNote singleContent">
                <p className="schoolName">Institution: {item.name}</p>
                <p className="address"> Address: {item.address}</p>
                <p className="note"> Note: {item.note}</p>

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
              background: `rgba(255, 255, 255, 0.548)`,
            }}
          />
        </div>

        <AddSchool />
      </div>
    )
  }
}

export default Notes
