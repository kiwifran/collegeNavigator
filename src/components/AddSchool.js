import React, { Component } from 'react'
import firebase from "firebase";
import uuid from 'uuid'

class AddSchool extends Component {
  constructor() {
    super();

    this.state ={
      name: '',
      address: '',
      note: '',
      category:'',
      id: ''
    }
  }
  
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      id: uuid.v4()
    })
  }
  onSubmit = e=>{
    e.preventDefault();
    if (this.state.name !== "" && this.state.address !== "" && /^\s*$/.test(this.state.name) === false && /^\s*$/.test(this.state.address) === false &&this.state.category!==""){
      const dbRef = firebase.database().ref();
      dbRef.push(this.state);
      this.setState({
        name:"",
        address:"",
        note:"",
        category:'',
        id: ''
      })
    }else {
      alert("check your input please🙁")
    }
  }
  render() {
    return (
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

          {/* <div className="radioButtons">
            <input
              type="radio"
              name="category"
              id="university"
              className="radioButtonDot"
              value="4bf58dd8d48988d1ae941735"
              required
              onChange={this.onChange}
              checked={(this.state.category === 'university')}
            />
            <label className="radioButtonLabel" htmlFor="university">
              University
              </label>

            <input
              type="radio"
              name="category"
              id="college"
              className="radioButtonDot"
              value="4bf58dd8d48988d1a2941735"
              required
              onChange={this.onChange}
              checked={(this.state.category === 'college')}
            />
            <label className="radioButtonLabel" htmlFor="college">
              College
              </label>

            <input
              type="radio"
              name="category"
              id="tradeSchool"
              className="radioButtonDot"
              value="4bf58dd8d48988d1ad941735"
              required
              onChange={this.onChange}
              checked={(this.state.category === 'tradeSchool')}
            />
            <label className="radioButtonLabel" htmlFor="trade">
              Trade School
              </label>
          </div> */}

          
          <input className="radioButtonDot" type="radio" name="category" id="college" value="college" onChange={this.onChange} checked={(this.state.category === 'college')} />
          <label htmlFor="college">College</label>
          <input className="radioButtonDot" type="radio" name="category" id="university" value="university" onChange={this.onChange} checked={(this.state.category === 'university')}/>
          <label htmlFor="university">University</label>
          <input className="radioButtonDot" type="radio" name="category" id="tradeSchool" value="tradeSchool" onChange={this.onChange} checked={(this.state.category === 'tradeSchool')}/>
          <label htmlFor="tradeSchool">Trade School</label>
        </fieldset>
        <div className="inputFieldContainer">
          <label htmlFor="inputSchoolNote">Note:</label>
          <textarea 
            id="inputSchoolNote" 
            placeholder="Note" 
            className="inputSchoolNote"
            name="note"
            value={this.state.note}
            onChange={this.onChange}
          ></textarea>
        </div>

        <label htmlFor="inputSchoolSubmit" className="visuallyHidden">Submit</label>
        <input 
          type="submit" 
          id="inputSchoolSubmit" 
          className="inputSchoolSubmit" 
          value="Save" 
        />
      </form>
    )
  }
}

export default AddSchool
