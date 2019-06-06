import React, { Component } from 'react'
import firebase from './firebase.js'
import AddSchool from './AddSchool.js'

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      bookmarkList: [],
      
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
  editNote = (key) => {
    const dbRef = firebase.database().ref(key);
    const userComment = prompt('other comments?');
    dbRef.child('note').set(userComment);

  }

  removeNote = (key) => {
    const dbRef = firebase.database().ref(key);
    dbRef.remove();
  }


  render() {
    return (
      <div className="noteContainer">
        <h2>NOTES</h2>
        <ul className="notes">
          {this.state.bookmarkList.map((item) => {
            return(
              <li key={item.key}>    
                <p className="schoolName">Institution: {item.name}</p>
                <p className="address"> Address: {item.address}</p>
                <button onClick={()=>{this.editNote(item.key)}}>
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
