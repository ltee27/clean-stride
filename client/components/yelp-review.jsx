import React from 'react';

function YelpReview(props) {
  return (
    <React.Fragment>
      <p className="yelpReviewText">{props.input.text}</p>
      <p className="font-weight-bold">{props.input.rating}/5 stars <br />-{props.input.user.name}</p>
    </React.Fragment>
  );
}

export default YelpReview;
