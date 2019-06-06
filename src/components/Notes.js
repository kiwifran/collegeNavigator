import React, { Component } from 'react'

class Notes extends Component {
  render() {
    return (
      <div className="noteContainer">
        <h2>NOTES</h2>
        <ul className="notes">
          {this.props.bookmarkList.map((item) => {
            console.log(item); 
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
      </div>
    )
  }
}

export default Notes
