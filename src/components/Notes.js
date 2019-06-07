import React, { Component } from 'react'
import firebase from './firebase.js'
import AddSchool from './AddSchool.js'
import jump from 'jump.js'
class Notes extends Component {
  constructor() {
    super();
    this.state = {
      bookmarkList: [],
      userNote: '',
      userName: '',
      userAddress: '',
      modalOpen: 'close',
      selectedId: '',
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
          id: data[item].id,
          note: data[item].note
        })
      }
      this.setState({
        bookmarkList: updateBookmark
      })
    })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  editNote = (key) => {
    const found = this.state.bookmarkList.find(item => item.key === key);
    this.setState({
      modalOpen: 'open',
      selectedId: key,
      userName: found.name,
      userAddress: found.address,
      userNote: found.note

    })
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    const dbRef = firebase.database().ref(this.state.selectedId);

    if (this.state.userName !== ''){
      dbRef.child('name').set(this.state.userName);
    } 
    if (this.state.userAddress !== '')  {
      dbRef.child('address').set(this.state.userAddress);
    }
    if (this.state.userNote !== ''){
      dbRef.child('note').set(this.state.userNote);
    }
    this.closeModal();

    this.setState({
      userNote:'',
      userAddress:'',
      userName: ''
    })
  }

  removeNote = (key) => {
    const dbRef = firebase.database().ref(key);
    dbRef.remove();
  }

  closeModal = () => {
    this.setState({
      modalOpen: 'close'
    })
  }
  handleScroll=()=>{
    jump('.inputSchoolForm', {
      duration: 1000,
      a11y: true
    })
  }
  render() {
    return (
      <div className="noteContainer">
        <h2>NOTES</h2>
        <button onClick={this.handleScroll} className="addSign">
          <i className="fas fa-plus"></i>
        </button>
        <div className={`modalWrapper ${this.state.modalOpen}`}>
          <div className="detailsOverlay"></div>
          <div className="detailsModal">
            <button onClick={this.closeModal} className="closeButton">
              <i className="fas fa-times"></i>
            </button>
            <form action="" className="editForm" onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name of Institution:</label>
              <input type="text" id="name" name="userName" onChange={this.handleChange} value={this.state.userName} />

              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="userAddress" onChange={this.handleChange} value={this.state.userAddress}/>

              <label htmlFor="addNote" >Add Note</label>
              <textarea onChange={this.handleChange} value={this.state.userNote} name="userNote"></textarea>
              <input type="submit" value="enter"/>
            </form>
          </div>
        </div>
        <ul className="notes">
          {this.state.bookmarkList.map((item) => {
            return(
              <div key={item.key}>    
                <p className="schoolName">Institution: {item.name}</p>
                <p className="address"> Address: {item.address}</p>
                <p className="note"> Note: {item.note}</p>

                <button onClick={() => { this.editNote(item.key) }}>
                  <i className="fas fa-pen"></i>Edit
                </button>
                <button onClick={() => { this.removeNote(item.key) }}>
                  <i className="fas fa-trash-alt"></i>Delete
                </button>
              </div>
            )
          })}
        </ul>

        <AddSchool />
      </div>
    )
  }
}

export default Notes
