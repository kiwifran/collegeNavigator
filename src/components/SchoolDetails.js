import React, { Component, Fragment } from 'react';

class SchoolDetails extends Component {
  constructor(props) {
    super(props);
    this.x = React.createRef();
  }

  componentDidMount() {
    this.x.current.focus()
  }

  isInfoEmpty = () => {
    for (let key in this.props.schoolMoreInfo) {
      return false;
    }
    return true;
  };

  // display details function
  displayDetails = () => {
    const { bestPhoto, name, contact, location, description, url } = this.props.schoolMoreInfo;   

    return (
      <Fragment>
        <div className="detailsOverlay" />

        <div className="detailsModal">
          <div className="detailsFlex">

            {/* close modal button */}
            <button onClick={this.props.closeMe} className="closeButton" ref={this.x} tabIndex='5'>
              <i className="fas fa-times" aria-label="close modal" />
            </button>

            {/* display a photo if available */}
            {bestPhoto !== undefined ? (
              <div className="imgWrapper">
                {/* since I see some photos are not as large as the size of 500x500 I changed it to 400 */}
                <img src={`${bestPhoto.prefix}400x400${bestPhoto.suffix}`} alt={`${name}`} tabIndex='5'/>
              </div>
            ) : null}

            <div className="smallInfoWrapper">
              <p tabIndex='5'>{name}</p>
              <p tabIndex='5'>{location.formattedAddress}</p>

              {/* display facebook link if available */}
              {contact.facebook ? (
                <p><a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/${contact.facebook}`}
                  tabIndex='5'
                >
                  <i className="fab fa-facebook" aria-label="Go to facebook" /> {contact.facebookName}
                </a></p>
              ) : null}

              {/* display twitter link if available */}
              {contact.twitter ? (
                <p><a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/${contact.twitter}`}
                  tabIndex='5'
                >
                  <i className="fab fa-twitter" aria-label="Go to twitter" /> @{contact.twitter}
                </a></p>
              ) : null}

              {/* display website link if available */}
              {url !== undefined ? (
                <p><a target="_blank" rel="noopener noreferrer" href={url} tabIndex='5'>
                  <i className="fas fa-link" aria-label="Go to website" /> Website
                </a></p>
              ) : null}

              {/* display address if available */}
              {contact.formattedAddress ? (
                <p tabIndex='5'>
                  <span>
                    <i className="fas fa-phone" />
                  </span>{' '}
                  {contact.formattedPhone}
                </p>
              ) : null}
            </div>

            {/* display description if available */}
            <div className="descriptionWrapper">
              {description !== undefined ? <p tabIndex='5'>{description}</p> : null}
            </div>
            {/* end of wrappers */}
          </div>
        </div>
      </Fragment>
    );
  };


  render() {
    return (
      <div className={`modalWrapper ${this.props.modalStatus}`}>
        {this.displayDetails()}
      </div>
    )
  }
}

export default SchoolDetails;
