import React, { Component } from 'react'
import firebase from "firebase";
class AddSchool extends Component {
  constructor() {
    super();

    this.state ={
      name: '',
      address: '',
      description: ''
    }
  }
  
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = e=>{
    e.preventDefault();
    if (this.state.name !== "" && this.state.address !== "" && /^\s*$/.test(this.state.name) === false && /^\s*$/.test(this.state.address) === false){
      const dbRef = firebase.database().ref();
      dbRef.push(this.state);
      this.setState({
        name:"",
        address:"",
        description:""
      })
    }else {
      alert("check your input please🙁")
    }
  }
  render() {
    return (
      <form className="inputSchoolForm" onSubmit={this.onSubmit}>
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

        <div className="inputFieldContainer">
          <label htmlFor="inputSchoolDescription">Description:</label>
          <textarea 
            id="inputSchoolDescription" 
            placeholder="Description" 
            className="inputSchoolDescription"
            name="description"
            value={this.state.description}
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
