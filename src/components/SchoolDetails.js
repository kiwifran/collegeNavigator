import React, {Component, Fragment} from 'react';

class SchoolDetails extends Component{
  
    // MORE INFO NOT CONNECTED 
    // THIS WON'T WORK BECAUSE THE ID IS BEING PASSED FROM SCHOOL COMPONENT WHICH IS INCEPTION LAYERS DEEP
    
    // EVERYTHING BELOW HERE WAS ORIGINAL
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
                        <button onClick={this.props.closeMe} className="closeButton">
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

    render(){
        return(
            <div className={`modalWrapper ${this.props.modalStatus}`}>            
            {!(this.isInfoEmpty())
                ? this.displayDetails()
                : null}
            </div>
        )
    }
}
export default SchoolDetails;