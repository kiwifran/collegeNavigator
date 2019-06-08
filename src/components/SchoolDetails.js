import React, {Component, Fragment} from 'react';

class SchoolDetails extends Component{
    isInfoEmpty = () => {
        for (let key in this.props.schoolMoreInfo) {
            return false;
        }
        return true;
    }
    
    displayDetails = () => {
        const { bestPhoto, name, contact, location, description, url } = this.props.schoolMoreInfo;
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
                                <img src={`${bestPhoto.prefix}400x400${bestPhoto.suffix}`} alt={`${name}`} />
                            </div>
                            : null}
                        <div className="smallInfoWrapper">
                            <p>{name}</p>
                            <p>{location.formattedAddress}</p>
                                {contact.twitter
                                ? <p><span><a target="_blank" rel="noopener noreferrer"  href={`https://twitter.com/${contact.twitter}`}><i class="fab fa-twitter"></i></a></span> {contact.twitter}</p>
                                :null}
                                {contact.facebook
                                ? <p><span><a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/${contact.facebook}`}><i class="fab fa-facebook"></i></a></span> {contact.facebook}</p>
                                :null}
                                {contact.formattedAddress
                                ? <p><span><i class="fas fa-phone"></i></span> {contact.formattedPhone}</p>
                                :null}


                        </div>
                        <div className="descriptionWrapper">
                            {description !== undefined
                                ? <p>{description}</p>
                                : null}
                            {url !== undefined
                                ? <a target="_blank" rel="noopener noreferrer" href={url}>Visit Website </a>
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