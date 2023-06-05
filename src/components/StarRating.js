import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStarRegular } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold' }} />);

    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} style={{ color: 'gold' }} />);
    }

    while (stars.length < 5) {
      stars.push(<FontAwesomeIcon key={stars.length} icon={farStarRegular} style={{ color: 'gold' }} />);
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
