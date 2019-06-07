import React, { Component } from 'react'
import firebase from './firebase.js'
import AddSchool from './AddSchool.js'

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      bookmarkList: [],
      userNote: '',
      modalOpen: 'close',
      selectedId: ''
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
          id: data[item].id
        })
      }
      this.setState({
        bookmarkList: updateBookmark
      })
    })
    // console.log(this.state.bookmarkList)
  }
  handleChange = (event) => {
    this.setState({
      userNote: event.currentTarget.value
    })
  }
  editNote = (key) => {
    this.setState({
      modalOpen: 'open',
      selectedId: key
    })
  }
  handleSubmit=()=> {
    const dbRef = firebase.database().ref(this.state.selectedId);
    dbRef.child('note').set(this.state.userNote);
    this.setState({
      userNote:''
    })
  }

  removeNote = (key) => {
    const dbRef = firebase.database().ref(key);
    dbRef.remove();
  }

  closeModal = () => {
    this.setState({
      modalOpen: 'close'
    })
  }

  render() {
    return (
      <div className="noteContainer">
        <h2>NOTES</h2>
        
        <div className={`modalWrapper ${this.state.modalOpen}`}>
          <button onClick={this.closeModal}>
            <i className="fas fa-times"></i>
          </button>
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="addNote" >Add Note</label>
            <textarea onChange={this.handleChange} value={this.state.userNote} placeholder="enter a comment"></textarea>
            <input type="submit" value="enter"/>
          </form>
        </div>
        <ul className="notes">
          {this.state.bookmarkList.map((item) => {
            return(
              <li key={item.key}>    
                <p className="schoolName">Institution: {item.name}</p>
                <p className="address"> Address: {item.address}</p>

                <button onClick={() => { this.editNote(item.key) }}>
                  <i className="fas fa-pen"></i>Edit
                </button>
                <button onClick={() => { this.removeNote(item.key) }}>
                  <i className="fas fa-trash-alt"></i>Delete
                </button>
              </li>
            )
          })}
        </ul>

        <AddSchool />
      </div>
    )
  }
}

export default Notes
