import React, {Component} from 'react'



class School extends Component {
  constructor() {
    super();
    this.state ={
      schoolNameList: [],
      schoolAddressList: [],
      schoolIdList: [],
    }
  }
  // create three lists: school names, address, id
  createStateLists = () => {
    const schoolNameList = this.props.schoolsList.map((item) => {
      return item.name;
    })
    const schoolAddressList = this.props.schoolsList.map((item) => {
      return item.location.formattedAddress;
    })
    const schoolIdList = this.props.schoolsList.map((item) => {
      return item.id;
    })
  
    this.setState({
      schoolNameList,
      schoolAddressList,
      schoolIdList
    })

  }
  // if index of clicked item equals index of item in list, return that item as a string
  // returned string will give bookmarked item's name, address and id
  // they will be passed back to parent's state through the setBookmarkState function
  addNote = mapIndex => {
    this.createStateLists();

    const oldSchoolNameList = [...this.state.schoolNameList];
    const bookmarkName = oldSchoolNameList.filter((item, filterIndex) => filterIndex === mapIndex);
    const bookmarkNameStr = bookmarkName.toString();

    const oldSchoolAddressList = [...this.state.schoolAddressList];
    const bookmarkAddress = oldSchoolAddressList.filter((item, filterIndex) => filterIndex === mapIndex);
    const bookmarkAddressStr = bookmarkAddress.toString();

    const oldSchoolIdList = [...this.state.schoolIdList];
    const bookmarkId = oldSchoolIdList.filter((item, filterIndex) => filterIndex === mapIndex);
    const bookmarkIdStr = bookmarkId.toString();

    this.props.setBookmarkState(bookmarkNameStr, bookmarkAddressStr, bookmarkIdStr);
  
    // add error handling here - if bookmarked states not empty string, then change bookmark icon color

  }
  render() {
    return(
      <div className="schoolsList container" aria-live="polite">
        {this.props.schoolsList.length ? this.props.schoolsList.map((school, mapIndex) => {
          const { id, name: schoolName, location} = school;
          const {address, city, country} = location;

          return (
            <div key={id} className="result">
              <p className="resultName">{schoolName}</p>
              <p className="resultAddress">{address} - {city}</p>
              <p className="resultCountry">{country}</p>
              <div className="bookmarkOff">
                <button key={mapIndex} onClick={()=> {this.addNote(mapIndex)}}><i className="far fa-bookmark"></i></button>
              </div>
              {/* <button onClick={() => moreInfo(id)}>More Info</button> */}
            </div>
          )
        }) : null}
      </div>
    )
  }
}

export default School
