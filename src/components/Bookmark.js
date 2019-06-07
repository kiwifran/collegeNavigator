import React, { Component } from 'react'
import firebase from 'firebase'

class Bookmark extends Component {
    constructor() {
        super()
        this.state = {
            isSaved: false
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
        dbRef.once('value', (response) => {
            const data = response.val();
            if(data !== null && data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === this.props.bookmarkId)
                    this.setState({
                        isSaved: true
                    })
                }     
            }
        })
    }

    render() {
        return(
            <button className='bookmark' onClick={() => { this.props.onClick(this.props.bookmarkId) }}><i className="far fa-bookmark"></i></button>
        )
    }
}

export default Bookmark