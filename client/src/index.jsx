/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SuggestionsContainer from './components/SuggestionsContainer';
import "./index.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: null,
    };
  }

  componentDidMount() {
    this.getBusinessInfo(Math.floor(Math.random() * 100));
  }

  getBusinessInfo(id) {
    axios.get(`/api/restaurant/info/${id}`)
      .then((response) => {
        this.setState({
          restaurant: response.data,
        });
      });
  }


  render() {
    const { restaurant } = this.state;

    if (restaurant === null) {
      return <div />;
    }
    return (
      <div id="suggestions-theme">
          <SuggestionsContainer
            cuisine={restaurant.details.cuisine}
            id={restaurant.id}
            name={restaurant.businessInfo.name}
          />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('zagat-suggestions'));

