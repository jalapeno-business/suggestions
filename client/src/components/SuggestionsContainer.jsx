import React from 'react';
import './SuggestionsContainer.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import Suggestion from './Suggestion';

export default class SuggestionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.getSuggestions(id);
  }

  getSuggestions(id) {
    axios.get(`/api/restaurant/suggestions/${id}`)
      .then((response) => {
        this.setState({
          suggestions: response.data,
        });
      });
  }

  render() {
    const { cuisine, name } = this.props;
    const { suggestions } = this.state;
    return (
      <div id="Suggestions-Container">
        <div id="Suggestions-header">
          <span>More</span>
          <span>{cuisine}</span>
          <span>Near</span>
          <span>{name}</span>
        </div>
        <div id="Suggestions">
          {suggestions.map(
            restaurant => <Suggestion key={restaurant.id} restaurant={restaurant} />,
          )}
        </div>
      </div>
    );
  }
}

SuggestionsContainer.propTypes = {
  id: PropTypes.number.isRequired,
  cuisine: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
