import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';
import swal from 'sweetalert';

class AddSchool extends Component {
  constructor() {
    super();

    this.state = {
      // user inputs from the form fields
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
      [e.target.name]: e.target.value
    });
  };

  // handle submit of form
  handleSubmit = e => {
    this.setState({
      // generated an ID from uuid for custom inputs so they match the saved schools from the api
      id: uuid.v4()
    });

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
        <form className="inputSchoolForm singleContent" onSubmit={this.handleSubmit}>
          <div className="inputFieldContainer">
            <label htmlFor="inputSchoolName">Name of Institution:</label>
            <input
              type="text"
              placeholder="Name"
              id="inputSchoolName"
              className="inputSchoolName"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </div>
          <fieldset className="inputFieldContainerRadio">
            <legend className="visuallyHidden">Category:</legend>

            <input
              className="radioButtonDot"
              type="radio"
              name="category"
              id="radioButtonCollege"
              value="College"
              onChange={this.handleChange}
              checked={this.state.category === 'College'}
            />
            <label htmlFor="radioButtonCollege" className="radioButtonLabel">
              College
            </label>
            <input
              className="radioButtonDot"
              type="radio"
              name="category"
              id="universityButtonCollege"
              value="University"
              onChange={this.handleChange}
              checked={this.state.category === 'University'}
            />
            <label htmlFor="universityButtonCollege" className="radioButtonLabel">
              University
            </label>
            <input
              className="radioButtonDot"
              type="radio"
              name="category"
              id="radioButtonTrade"
              value="Trade School"
              onChange={this.handleChange}
              checked={this.state.category === 'Trade School'}
            />
            <label htmlFor="radioButtonTrade" className="radioButtonLabel">
              Trade School
            </label>
          </fieldset>

          <div className="inputFieldContainer">
            <label htmlFor="inputSchoolNote">Note (optional):</label>
            <textarea
              id="inputSchoolNote"
              placeholder="Note"
              className="inputSchoolNote"
              name="note"
              value={this.state.note}
              onChange={this.handleChange}
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
