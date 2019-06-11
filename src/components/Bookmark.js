import React, { Component } from 'react';
import firebase from 'firebase';

class Bookmark extends Component {
  constructor() {
    super();
    this.state = {
      // bookmark class name for non-bookmarked schools
      bookmark: 'far fa-bookmark',
      // corresponding aria-label for bookmark
      ariaBookmark: 'item not bookmarked'
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    // takes snapshot of firebase
    dbRef.once('value', response => {
      const data = response.val();
      const bookmarkArray = [];

      // loop through the returned data and push the keys of each firebase item to an array
      for (let item in data) {
        bookmarkArray.push({
          id: data[item].id
        });
      }

      // if there is at least one entry in firebase compares if any schools were previously saved into firebase against stored search results
      if (bookmarkArray !== null && bookmarkArray.length > 0) {
        bookmarkArray.forEach(school => {
          // matches have the bookmark icon listed as bookmarked (ie. filled in)
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
  handleClick = bookmark => {
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
      this.props.addBookmark(this.props.bookmarkId);
    }
  };

  render() {
    return (
      <div className="bookmarkPosition">
        <button className="bookmark" onClick={() => this.handleClick(this.state.bookmark)}>
          {/* icon changes based on toggle in state of class name */}
          <i
            className={`${this.state.bookmark} bookmarkIcon`}
            aria-label={this.state.ariaBookmark}
          />
        </button>
      </div>
    );
  }
}

export default Bookmark;
