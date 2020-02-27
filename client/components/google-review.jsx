import React from 'react';

function GoogleReview(props) {
  return (
    <React.Fragment>
      <p className="googleReviewText">{props.input.text}</p>
      <p className="font-weight-bold">{props.input.rating}/5 stars <br />-{props.input.author_name}</p>
    </React.Fragment>
  );
}

export default GoogleReview;
