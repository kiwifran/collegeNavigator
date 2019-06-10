import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';
import swal from 'sweetalert';

class AddSchool extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      address: '',
      note: '',
      category: '',
      id: ''
    };
  }

  // handle change for form change
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      id: uuid.v4()
    });
  };

  // handle submit of form
  handleSubmit = e => {

    // RegEx test to ensure search field isn't an empty string
    if (
      this.state.name !== '' &&
      this.state.address !== '' &&
      /^\s*$/.test(this.state.name) === false &&
      /^\s*$/.test(this.state.address) === false &&
      this.state.category !== ''
    ) {
      // push the added school to the database
      const dbRef = firebase.database().ref();
      dbRef.push(this.state);
      this.setState({
        name: '',
        address: '',
        note: '',
        category: '',
        id: ''
      });
    } else {
      // alert when all fields aren't completed
      swal({
        title: 'oops',
        text: 'please enter required fields',
        icon: 'warning'
      });
    }

    e.preventDefault();
  };

  render() {
    return (
      <div className="wrapper">
        <form className="inputSchoolForm singleContent" onSubmit={this.onSubmit}>
          <div className="inputFieldContainer">
            <label htmlFor="inputSchoolName">Name of Institution:</label>
            <input
              type="text"
              placeholder="Name"
              id="inputSchoolName"
              className="inputSchoolName"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>

          <div className="inputFieldContainer">
            <label htmlFor="inputSchoolAddress">Address:</label>
            <input
              type="text"
              placeholder="Address"
              id="inputSchoolAddress"
              className="inputSchoolAddress"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
            />
          </div>
          <fieldset className="inputFieldContainerRadio">
            <legend className="visuallyHidden">Category:</legend>

            <input
              className="radioButtonDot"
              type="radio"
              name="category"
              id="college"
              value="college"
              onChange={this.onChange}
              checked={this.state.category === 'college'}
            />
            <label htmlFor="college">College</label>
            <input
              className="radioButtonDot"
              type="radio"
              name="category"
              id="university"
              value="university"
              onChange={this.onChange}
              checked={this.state.category === 'university'}
            />
            <label htmlFor="university">University</label>
            <input
              className="radioButtonDot"
              type="radio"
              name="category"
              id="tradeSchool"
              value="tradeSchool"
              onChange={this.onChange}
              checked={this.state.category === 'tradeSchool'}
            />
            <label htmlFor="tradeSchool">Trade School</label>
          </fieldset>
          <div className="inputFieldContainer">
            <label htmlFor="inputSchoolNote">Note (optional):</label>
            <textarea
              id="inputSchoolNote"
              placeholder="Note"
              className="inputSchoolNote"
              name="note"
              value={this.state.note}
              onChange={this.onChange}
            />
          </div>

          <label htmlFor="inputSchoolSubmit" className="visuallyHidden">
            Submit
        </label>
          <input
            type="submit"
            id="inputSchoolSubmit"
            className="inputSchoolSubmit generalButton"
            value="Save"
          />
        </form>
      </div>
      
    );
  }
}

export default AddSchool;
