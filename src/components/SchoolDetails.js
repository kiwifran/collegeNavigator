import React, {Component, Fragment} from 'react';
class SchoolDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
        }	
    }
    
    // MORE INFO NOT CONNECTED 
    // THIS WON'T WORK BECAUSE THE ID IS BEING PASSED FROM SCHOOL COMPONENT WHICH IS INCEPTION LAYERS DEEP
    moreInfo = (id) => {
        console.log(id);
        axios.get(`https://api.foursquare.com/v2/venues/${id}`, {
            params: {
                // THIS IS ANDREW'S API KEY 
                // client_id: 'H5KTLRAURYRNV350DJHQNDMORMYO0GN3KP12FFUMTXWI2XCO',
                // client_secret: 'XIFGNZS4EZHSNJD2U45HSDMBUGTW4TEF5RKK3BZBW3V4R5NB',

                //then it's Frankie's
                // client_id: 'JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY',
                // client_secret: 'XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3',

                //Jasmine
                client_id: 'CJ4XSVLTY1JQ3SPHZV00JRFHCFAIXO5Y1HAASCOPGXG3URXV',
                client_secret: 'WUABEMQMIZBR2LSKFURNG4NY2IF10CDAPAX0QSWWYGFGV2ZP',
                v: 20190101,
            }
        }).then(res => {
            // console.log(res.data.response.venue);
            const schoolMoreInfo = res.data.response.venue;

            this.setState({
                // schoolPhotoUrl  :`${schoolDetails.bestPhoto.prefix}500x500${schoolDetails.bestPhoto.suffix}`,
                // schoolName :schoolDetails.name,
                // schoolAddress: schoolDetails.location.formattedAddress,
                schoolMoreInfo: schoolMoreInfo,
                isModalOpen: true

            })
        }).catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }

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