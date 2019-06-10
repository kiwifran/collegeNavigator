import React, { Component } from 'react';
import firebase from 'firebase';

class Bookmark extends Component {
  constructor() {
    super();
    this.state = {
      bookmark: 'far fa-bookmark',
      ariaBookmark: 'item not bookmarked'
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
              bookmark: 'fas fa-bookmark',
              ariaBookmark: 'item bookmarked'
            });
          }
        });
      }
    });
  }

  // handle click for adding a bookmark
  handleClick = (bookmark) => {
    // check if the search item returned was bookmarked or not
    if (bookmark === 'fas fa-bookmark') {
      // if it is not bookmarked, be able to add it
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
              bookmark: 'far fa-bookmark',
              ariaBookmark: 'item not bookmarked'
            });
            const dbRemove = firebase.database().ref(school.dbKey);
            dbRemove.remove();
          }
        });
      });
    } else if (bookmark === 'far fa-bookmark') {
      // if it is bookmarked, remove the bookmark
      this.setState({
        bookmark: 'fas fa-bookmark',
        ariaBookmark: 'item bookmarked'
      });
      this.props.addNote(this.props.bookmarkId);
    }
  }

  render() {
    return (
      <div className="bookmarkPosition">
        <button className="bookmark">
          {/* icon changes based on toggle in state of class name */}
          <i 
            className={`${this.state.bookmark} bookmarkIcon`} 
            aria-label={this.state.ariaBookmark} 
            onClick={() => this.handleClick(this.state.bookmark)}
          />
        </button>
      </div>
    );
  }
}

export default Bookmark;
