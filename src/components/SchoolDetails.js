import React, { Fragment } from 'react';

function SchoolDetails(props) {
  const isInfoEmpty = () => {
    for (let key in props.schoolMoreInfo) {
      return false;
    }
    return true;
  };

  // display details function
  const displayDetails = () => {
    const { bestPhoto, name, contact, location, description, url } = props.schoolMoreInfo;

    console.log(contact)

    return (
      <Fragment>
        <div className="detailsOverlay" />

        <div className="detailsModal">
          <div className="detailsFlex">

            {/* close modal button */}
            <button onClick={props.closeMe} className="closeButton">
              <i className="fas fa-times" aria-label="close modal"/>
            </button>

            {/* display a photo if available */}
            {bestPhoto !== undefined ? (
              <div className="imgWrapper">
                {/* since I see some photos are not as large as the size of 500x500 I changed it to 400 */}
                <img src={`${bestPhoto.prefix}400x400${bestPhoto.suffix}`} alt={`${name}`} />
              </div>
            ) : null}

            <div className="smallInfoWrapper">
              <p>{name}</p>
              <p>{location.formattedAddress}</p>
              
              {/* display facebook link if available */}
              {contact.facebook ? (
                <p><a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/${contact.facebook}`}
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
                  >
                    <i className="fab fa-twitter" aria-label="Go to twitter" /> @{contact.twitter}
                </a></p>
              ) : null}

              {/* display website link if available */}
              {url !== undefined ? (
                <p><a target="_blank" rel="noopener noreferrer" href={url}>
                  <i className="fas fa-link" aria-label="Go to website" /> Website
                </a></p>
              ) : null}

              {/* display address if available */}
              {contact.formattedAddress ? (
                <p>
                  <span>
                    <i className="fas fa-phone" />
                  </span>{' '}
                  {contact.formattedPhone}
                </p>
              ) : null}
            </div>

            {/* display description if available */}
            <div className="descriptionWrapper">
              {description !== undefined ? <p>{description}</p> : null}
            </div>
            {/* end of wrappers */}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div className={`modalWrapper ${props.modalStatus}`}>
      {!isInfoEmpty() ? displayDetails() : null}
    </div>
  );
}

export default SchoolDetails;
