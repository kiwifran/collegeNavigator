import React, {Component} from 'react';

class Search extends Component {
    render() {
        return (
            <div>
                <ul>
                <li value="4bf58dd8d48988d1ae941735" onClick={this.props.getInstitute}>university</li>
                <li value="4bf58dd8d48988d1a2941735" onClick={this.props.getInstitute}>college</li>
                <li value="4bf58dd8d48988d1ad941735" onClick={this.props.getInstitute}>trade school</li>
                </ul>
                <input type="text" name="search" id="search" onChange={this.props.onChange}/>
                <button onClick={this.props.onClick}>Get School List</button>
            </div>
        )
    }
}

export default Search