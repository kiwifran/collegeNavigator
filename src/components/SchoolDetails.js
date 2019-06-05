import React, {Component, Fragment} from 'react';
class SchoolDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
        }	
    }	
    isInfoEmpty = () => {
        for (let key in this.props.schoolMoreInfo) {
            return false;
        }
        return true;
    }
    displayDetails = () => {
        const { bestPhoto, name, contact, location, description, url } = this.props.schoolMoreInfo;
        console.log(bestPhoto);
        return (
                <Fragment>
                <div className="detailsOverlay"></div>

                <div className="detailsModal">
                    <div className="detailsFlex">
                        <button onClick={this.handleCloseClick} className="closeButton">
                            <i className="fas fa-times"></i>
                        </button>
                        {bestPhoto !== undefined
                            ? <div className="imgWrapper">
                                {/* since I see some photos are not as large as the size of 500x500 I changed it to 400 */}
                                <img src={`${bestPhoto.prefix}400x400${bestPhoto.suffix}`} alt={`picture of ${name}`} />
                            </div>
                            : null}
                        <div className="smallInfoWrapper">
                            <p>{name}</p>
                            <p>{location.formattedAddress}</p>
                            {(contact.twitter !== undefined && contact.facebook !== undefined)
                                ? <div className="contacts">
                                    <p>{contact.twitter}</p>
                                    <p>{contact.facebook}</p>
                                    <p>{contact.formattedPhone}</p>
                                </div>
                                : (contact.twitter === undefined && contact.facebook !== undefined)
                                    ? <div className="contacts">
                                        <p>{contact.facebook}</p>
                                        <p>{contact.formattedPhone}</p>
                                    </div>
                                    : (contact.twitter !== undefined && contact.facebook === undefined)
                                        ? <div className="contacts">
                                            <p>{contact.twitter}</p>
                                            <p>{contact.formattedPhone}</p>
                                        </div>
                                        : <div className="contacts">
                                            <p>{contact.formattedPhone}</p>
                                        </div>}

                        </div>
                        <div className="descriptionWrapper">
                            {description !== undefined
                                ? <p>{description}</p>
                                : null}
                            {url !== undefined
                                ? <a href={url}>Visit Website </a>
                                : null}
                        </div>
                        {/* end of wrappers */}
                    </div>
                </div>
            </Fragment>

        )
    }
    // openClose=(value)=>{
    //   const modal = document.querySelector(".modalWrapper");

    //   if(value===false) {
    //     modal.classList.add("close");

    //   }else {
    //     modal.classList.remove("close");
    //   }
    // }
    handleCloseClick = () => {
        this.setState({
            isModalOpen: false,
        })
        // not sure do we need to setState here
        // const modal = document.querySelector(".modalWrapper");
        // modal.classList.add("close");
        console.log('clicked!');


    }

    componentDidMount(){

    }
    componentDidUpdate(prevProps, prevState) {
    }
    render(){
        return(
            <div className="modalWrapper">
            {!(this.isInfoEmpty())
                ? this.displayDetails()
                : null}
            </div>
        )
    }
}
export default SchoolDetails;