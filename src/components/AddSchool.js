import React, { Component } from 'react'
import firebase from "firebase";
class AddSchool extends Component {
  constructor() {
    super();

    this.state ={
      name: '',
      address: '',
      note: '',
      category:'',
    }
  }
  
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
        category:''
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
        <fieldset className="inputFieldContainer">
          <legend>Category:</legend>
          <label htmlFor="college">College</label>
          <input type="radio" name="category" id="college" value="college" onChange={this.onChange} checked={(this.state.category === 'college')} />
          <label htmlFor="university">University</label>
          <input type="radio" name="category" id="university" value="university" onChange={this.onChange} checked={(this.state.category === 'university')}/>
          <label htmlFor="tradeSchool">Trade School</label>
          <input type="radio" name="category" id="tradeSchool" value="tradeSchool" onChange={this.onChange} checked={(this.state.category === 'tradeSchool')}/>
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
