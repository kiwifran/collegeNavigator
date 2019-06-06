import React, { Component } from 'react';

class Search extends Component {
    constructor() {
        super()
        this.state = {
            university: false,
            college: false,
            tradeSchool: false
        }
    }

    handleClick = (event) => {
        if (event.currentTarget.getAttribute('value') === '4bf58dd8d48988d1ae941735') {
            this.setState({
                university: true,
                college: false,
                tradeSchool: false
            })
        } else if (event.currentTarget.getAttribute('value') === '4bf58dd8d48988d1a2941735') {
            this.setState({
                university: false,
                college: true,
                tradeSchool: false
            })
        } else if (event.currentTarget.getAttribute('value') === '4bf58dd8d48988d1ad941735') {
            this.setState({
                university: false,
                college: false,
                tradeSchool: true
            })
        }
        this.props.getInstitute(event)
    }

    render() {
        return (
            <div className='searchContainer wrapper'>
                <div className='radioButtons'>
                    {this.state.university ?
                        <div className='radioButton selected'>
                            <input type='radio' name='institution' id='university' value='4bf58dd8d48988d1ae941735' selected></input>
                            <label htmlFor="university">University</label>
                        </div>
                        :
                        <div className='radioButton'>
                            <input type='radio' name='institution' id='university' value='4bf58dd8d48988d1ae941735' onClick={this.handleClick}></input>
                            <label htmlFor="university">University</label>
                        </div>}

                    {this.state.college ?
                        <div className='radioButton selected'>
                            <input type='radio' name='institution' id='college' value='4bf58dd8d48988d1a2941735' selected></input>
                            <label htmlFor="college">College</label>
                        </div>
                        :
                        <div className='radioButton'>
                            <input type='radio' name='institution' id='college' value='4bf58dd8d48988d1a2941735' onClick={this.handleClick}></input>
                            <label htmlFor="college">College</label>
                        </div>}

                    {this.state.tradeSchool ?
                        <div className='radioButton selected'>
                            <input type='radio' name='institution' id='tradeSchool' value='4bf58dd8d48988d1ad941735' selected></input>
                            <label htmlFor="tradeSchool">Trade School</label>
                        </div>
                        :
                        <div className='radioButton'>
                            <input type='radio' name='institution' id='tradeSchool' value='4bf58dd8d48988d1ad941735' onClick={this.handleClick}></input>
                            <label htmlFor="tradeSchool">Trade School</label>
                        </div>}
                </div>
                <input type="text" name="search" id="search" onChange={this.props.onChange} />
                <button onClick={this.props.onClick}>Get School List</button>
            </div>
        )
    }
}

export default Search