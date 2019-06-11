import React, { Component, Fragment } from 'react';

class SchoolDetails extends Component {
  constructor(props) {
    super(props);
    // this.x = React.createRef();

    this.x = React.createRef();
    // console.log(this.x)
    
  }

  componentDidMount() {
    // this.x.current.focus()
    // const { bestPhoto, name, contact, location, description, url } = this.props.schoolMoreInfo;
  }

  isInfoEmpty = () => {
    for (let key in this.props.schoolMoreInfo) {
      return false;
    }
    return true;
  };

  // display details function
  // displayDetails = () => {
  //   const { bestPhoto, name, contact, location, description, url } = this.props.schoolMoreInfo;
  //   // console.log(this.x)
  //   // console.log(contact)
    

  //   return (
  //     <Fragment>
  //       <div className="detailsOverlay" />

  //       <div className="detailsModal">
  //         <div className="detailsFlex">

  //           {/* close modal button */}
  //           <button onClick={this.props.closeMe} className="closeButton" ref={this.x}>
  //             <i className="fas fa-times" aria-label="close modal" />
  //           </button>

  //           {/* display a photo if available */}
  //           {bestPhoto !== undefined ? (
  //             <div className="imgWrapper">
  //               {/* since I see some photos are not as large as the size of 500x500 I changed it to 400 */}
  //               <img src={`${bestPhoto.prefix}400x400${bestPhoto.suffix}`} alt={`${name}`} />
  //             </div>
  //           ) : null}

  //           <div className="smallInfoWrapper">
  //             <p>{name}</p>
  //             <p>{location.formattedAddress}</p>

  //             {/* display facebook link if available */}
  //             {contact.facebook ? (
  //               <p><a
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 href={`https://www.facebook.com/${contact.facebook}`}
  //               >
  //                 <i className="fab fa-facebook" aria-label="Go to facebook" /> {contact.facebookName}
  //               </a></p>
  //             ) : null}

  //             {/* display twitter link if available */}
  //             {contact.twitter ? (
  //               <p><a
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 href={`https://twitter.com/${contact.twitter}`}
  //               >
  //                 <i className="fab fa-twitter" aria-label="Go to twitter" /> @{contact.twitter}
  //               </a></p>
  //             ) : null}

  //             {/* display website link if available */}
  //             {url !== undefined ? (
  //               <p><a target="_blank" rel="noopener noreferrer" href={url}>
  //                 <i className="fas fa-link" aria-label="Go to website" /> Website
  //               </a></p>
  //             ) : null}

  //             {/* display address if available */}
  //             {contact.formattedAddress ? (
  //               <p>
  //                 <span>
  //                   <i className="fas fa-phone" />
  //                 </span>{' '}
  //                 {contact.formattedPhone}
  //               </p>
  //             ) : null}
  //           </div>

  //           {/* display description if available */}
  //           <div className="descriptionWrapper">
  //             {description !== undefined ? <p>{description}</p> : null}
  //           </div>
  //           {/* end of wrappers */}
  //         </div>
  //       </div>
  //     </Fragment>
  //   );
  // };


  render() {
    return (
      <div className={`modalWrapper ${this.props.modalStatus}`}>
        {!this.isInfoEmpty() ? 
          
          <Fragment>
            <div className="detailsOverlay" />

            <div className="detailsModal">
              <div className="detailsFlex">

                {/* close modal button */}
                <button onClick={this.props.closeMe} className="closeButton" ref={this.x}>
                  <i className="fas fa-times" aria-label="close modal" />
                </button>

                {/* display a photo if available */}
                {this.props.schoolMoreInfo.bestPhoto !== undefined ? (
                  <div className="imgWrapper">
                    {/* since I see some photos are not as large as the size of 500x500 I changed it to 400 */}
                    <img src={`${this.props.schoolMoreInfo.bestPhoto.prefix}400x400${this.props.schoolMoreInfo.bestPhoto.suffix}`} alt={`${this.props.schoolMoreInfo.name}`} />
                  </div>
                ) : null}

                <div className="smallInfoWrapper">
                  <p>{this.props.schoolMoreInfo.name}</p>
                  <p>{this.props.schoolMoreInfo.location.formattedAddress}</p>

                  {/* display facebook link if available */}
                  {this.props.schoolMoreInfo.contact.facebook ? (
                    <p><a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.facebook.com/${this.props.schoolMoreInfo.contact.facebook}`}
                    >
                      <i className="fab fa-facebook" aria-label="Go to facebook" /> {this.props.schoolMoreInfo.contact.facebookName}
                    </a></p>
                  ) : null}

                  {/* display twitter link if available */}
                  {this.props.schoolMoreInfo.contact.twitter ? (
                    <p><a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://twitter.com/${this.props.schoolMoreInfo.contact.twitter}`}
                    >
                      <i className="fab fa-twitter" aria-label="Go to twitter" /> @{this.props.schoolMoreInfo.contact.twitter}
                    </a></p>
                  ) : null}

                  {/* display website link if available */}
                  {this.props.schoolMoreInfo.url !== undefined ? (
                    <p><a target="_blank" rel="noopener noreferrer" href={this.props.schoolMoreInfo.url}>
                      <i className="fas fa-link" aria-label="Go to website" /> Website
                </a></p>
                  ) : null}

                  {/* display address if available */}
                  {this.props.schoolMoreInfo.contact.formattedAddress ? (
                    <p>
                      <span>
                        <i className="fas fa-phone" />
                      </span>{' '}
                      {this.props.schoolMoreInfo.contact.formattedPhone}
                    </p>
                  ) : null}
                </div>

                {/* display description if available */}
                <div className="descriptionWrapper">
                  {this.props.schoolMoreInfo.description !== undefined ? <p>{this.props.schoolMoreInfo.description}</p> : null}
                </div>
                {/* end of wrappers */}
              </div>
            </div>
          </Fragment>
              
              : null}
      </div>
    )
  }
}

export default SchoolDetails;
