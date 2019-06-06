import React, { Component } from 'react'
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

  render() {
    return (
      <div className="noteContainer">
        <h2>NOTES</h2>
        <ul className="notes">
          {this.props.bookmarkList.map((item) => {
            return(
              <li key={item.key}>    
                <p className="schoolName">Institution: {item.name}</p>
                <p className="address"> Address: {item.address}</p>
                <button>
                  <i className="fas fa-pen"></i>Edit
                </button>
                <button onClick={() => { this.props.removeNote(item.key) }}>
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
