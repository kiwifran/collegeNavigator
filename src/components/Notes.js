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
                <button>Edit</button>
                <button>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Notes
