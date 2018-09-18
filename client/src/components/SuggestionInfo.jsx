import React from 'react';
import PropTypes from 'prop-types';
import './SuggestionInfo.css';
import zagatLogo from './icons/zagat_icon.png';
import googleLogo from './icons/google.png';
import stars from './icons/stars.jpg';

export default class SuggestionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgRating: 0,
    };
  }


  componentDidMount() {
    const { restaurant } = this.props;
    this.calculateAvgRating(restaurant.reviews);
  }

  calculateAvgRating(reviews) {
    const totalRating = reviews.reduce((sum, { numOfStars }) => sum + numOfStars, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);
    this.setState({
      avgRating,
    });
  }

  render() {
    const { restaurant, isHovered } = this.props;
    const { avgRating } = this.state;
    const tempArray = [];

    for (let i = 0; i < restaurant.details.dollarSigns; i += 1) {
      tempArray.push(0);
    }
    const spacerMargin = {
      margin: '0 3px',
    };
    const suggestionName = isHovered
      ? 'suggestion-name'
      : 'suggestion-name underline';

    return (
      <div id="suggestion-info">
        <span className={suggestionName}>
          {restaurant.businessInfo.name}
        </span>
        <div className="suggestion-categories">
          <span>{restaurant.details.cuisine}</span>
          <span style={spacerMargin}> · </span>
          <span>{restaurant.businessInfo.location.neighborhood}</span>
          <span style={spacerMargin}> · </span>
          <div>
            {tempArray.map(() => <span key={Math.floor(Math.random() * 100)}>$</span>)}
          </div>
        </div>
        <div className="suggestion-rating">
          <img className="zagat-logo" src={'https://s3.us-east-2.amazonaws.com/zagat-fec/zagat_icon.png'} alt="zagat-logo" />
          <div className="zagat-review-text">
            <span>FOOD </span>
            <span style={{ color: 'red' }}>{restaurant.zagatReview.review}</span>
          </div>
          <img className="google-logo" src={'https://s3.us-east-2.amazonaws.com/zagat-fec/google.png'} alt="google-logo" />
          <div className="google-text">
            <span>{avgRating}</span>
            <img className="stars" src={'https://s3.us-east-2.amazonaws.com/zagat-fec/stars.jpg'} alt="5stars" />
          </div>
        </div>
        <div>
          {restaurant.businessInfo.tag}
        </div>
      </div>
    );
  }
}

SuggestionInfo.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  restaurant: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    businessInfo: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      location: PropTypes.shape({
        address: PropTypes.string.isRequired,
        neighborhood: PropTypes.string.isRequired,
      }),
      social: PropTypes.shape({
        facebook: PropTypes.bool.isRequired,
        instagram: PropTypes.bool.isRequired,
        linkedin: PropTypes.bool.isRequired,
      }),
      times: PropTypes.shape({
        Friday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        Monday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        Saturday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        Sunday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        Thursday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        Tuesday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        Wednesday: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired,
    }),
    details: PropTypes.shape({
      cuisine: PropTypes.string.isRequired,
      insiderTips: PropTypes.string,
      opentable: PropTypes.bool.isRequired,
      dollarSigns: PropTypes.number.isRequired,
      knownFor: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }),
    photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    publications: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        profilePic: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        numOfStars: PropTypes.number.isRequired,
        star: PropTypes.bool.isRequired,
      }).isRequired,
    ).isRequired,
    whatToOrder: PropTypes.arrayOf(
      PropTypes.shape({
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    zagatReview: PropTypes.shape({
      description: PropTypes.string.isRequired,
      review: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
