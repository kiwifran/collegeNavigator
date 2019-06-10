import React, { Component } from 'react';
import firebase from 'firebase';

class Bookmark extends Component {
  constructor() {
    super();
    this.state = {
      bookmark: 'far fa-bookmark'
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.once('value', response => {
      const data = response.val();
      const bookmarkArray = [];

      for (let item in data) {
        bookmarkArray.push({
          id: data[item].id
        });
      }

      if (bookmarkArray !== null && bookmarkArray.length > 0) {
        bookmarkArray.forEach(school => {
          if (school.id === this.props.bookmarkId) {
            this.setState({
              bookmark: 'fas fa-bookmark'
            });
          }
        });
      }
    });
  }

  handleClick = (bookmark) => {
    if (bookmark === 'fas fa-bookmark') {
      const dbRef = firebase.database().ref();
      dbRef.once('value', response => {
        const data = response.val();
        const bookmarkArray = [];

        for (let item in data) {
          bookmarkArray.push({
            dbKey: item,
            id: data[item].id
          });
        }

        bookmarkArray.forEach(school => {
          if (school.id === this.props.bookmarkId) {
            this.setState({
              bookmark: 'far fa-bookmark'
            });
            const dbRemove = firebase.database().ref(school.dbKey);
            dbRemove.remove();
          }
        });
      });
    } else if (bookmark === 'far fa-bookmark') {
      this.setState({
        bookmark: 'fas fa-bookmark'
      });
      this.props.addNote(this.props.bookmarkId);
    }
  }

  render() {
    return (
      <div className="bookmarkPosition">
        <button className="bookmark">
          <i className={`${this.state.bookmark} bookmarkIcon`} onClick={() => this.handleClick(this.state.bookmark)}/>
        </button>
      </div>
    );
  }
}

export default Bookmark;
