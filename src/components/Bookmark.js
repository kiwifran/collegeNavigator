import React, { Component } from 'react'
import firebase from 'firebase'

class Bookmark extends Component {
    constructor() {
        super()
        this.state = {
            isSaved: false
        }
    }

    saveBookmark = () => {
        this.setState({
            isSaved: true
        })
        this.props.addNote(this.props.bookmarkId)
    }

    removeBookmark = () => {
        const dbRef = firebase.database().ref();
        dbRef.once('value', (response) => {
            const data = response.val();
            const bookmarkArray = [];

            for (let item in data) {
                bookmarkArray.push({
                    dbKey: item,
                    id: data[item].id
                })
            }

            bookmarkArray.forEach((school) => {
                if (school.id === this.props.bookmarkId) {
                    this.setState({
                        isSaved: false
                    })
                    const dbRemove = firebase.database().ref(school.dbKey)
                    dbRemove.remove()
                }
            })
        })
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
        dbRef.once('value', (response) => {
            const data = response.val();
            const bookmarkArray = [];

            for (let item in data) {
                bookmarkArray.push({
                    id: data[item].id
                })
            }

            if (bookmarkArray !== null && bookmarkArray.length > 0) {
                bookmarkArray.forEach((school) => {
                    if (school.id === this.props.bookmarkId) {
                        this.setState({
                            isSaved: true
                        })
                    }
                })
            }
        })
    }

    // for (let i = 0; i < data.length; i++) {
    //     if (data[i].id === this.props.bookmarkId)
    //     this.setState({
    //         isSaved: true
    //     })
    // }     
    // }
    // })

    render() {
        return (
            <div className="bookmarkPosition">
                {this.state.isSaved ?
                    <button className='bookmark' onClick={this.removeBookmark}>
                        <i className="fas fa-bookmark saved"></i>
                    </button>
                    :
                    <button className='bookmark' onClick={this.saveBookmark}>
                        <i className="far fa-bookmark saved"></i>
                    </button>
                }
            </div>
        )
    }
}

export default Bookmark