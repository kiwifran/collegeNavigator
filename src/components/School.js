import React, { Component } from 'react'

class School extends Component {
  constructor() {
    super();
    this.state = {
      bookmarked: false
    }
  }

  addNote = (id) => {
    this.props.setBookmarkState(id)
  }
  
  render() {
    return (
      <div className="schoolsList container" aria-live="polite">
        {this.props.schoolsList.length ? this.props.schoolsList.map(school => {
          const { id, name: schoolName, location } = school;
          const { address, city, country } = location;

          return (
            <div key={id} className="result">
              <p className="resultName">{schoolName}</p>
              <p className="resultAddress">{address} - {city}</p>
              <p className="resultCountry">{country}</p>
              <div className="bookmarkOff">
                <button onClick={() => { this.addNote(id) }}><i className="far fa-bookmark"></i></button>
              </div>
              <button onClick={() => this.props.userSelectSchoolId(id)}>More Info</button>
            </div>
          )
        }) : null}
      </div>
    )
  }
}

export default School
