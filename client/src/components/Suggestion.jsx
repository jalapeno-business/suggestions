import React from 'react';
import PropTypes from 'prop-types';
import SuggestionPics from './SuggestionPics';
import SuggestionInfo from './SuggestionInfo';
import './Suggestion.css';

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onHover: false,
    };

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    const { onHover } = this.state;
    this.setState({
      onHover: !onHover,
    });
  }

  render() {
    const { restaurant } = this.props;
    const { onHover } = this.state;
    return (
      <div
        className="suggestion-template"
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <div className="suggestion-photo">
          <SuggestionPics photos={restaurant.photos} />
        </div>
        <div className="suggestion-info">
          <SuggestionInfo isHovered={onHover} restaurant={restaurant} />
        </div>
      </div>
    );
  }
}

Suggestion.propTypes = {
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
