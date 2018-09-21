import React from 'react';
import PropTypes from 'prop-types';
import './SuggestionPics.css';

export default class SuggestionPics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPic: 0,
    };

    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.handlePrevBtn = this.handlePrevBtn.bind(this);
  }

  handleNextBtn() {
    const { currentPic } = this.state;
    const { photos } = this.props;
    const newCurrentPic = currentPic === photos.length - 1
      ? 0
      : currentPic + 1;
    this.setState({
      currentPic: newCurrentPic,
    });
  }

  handlePrevBtn() {
    const { currentPic } = this.state;
    const { photos } = this.props;
    const newCurrentPic = currentPic === 0
      ? photos.length - 1
      : currentPic - 1;
    this.setState({
      currentPic: newCurrentPic,
    });
  }

  render() {
    const { photos } = this.props;
    const { currentPic } = this.state;
    const options = {
      display: 'flex',
      height: '250px',
      width: '100%',
      minWidth: '100px',
      backgroundSize: 'cover',
      backgroundImage: `url(${photos[currentPic]})`,
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    return (
      <div>
        {
          photos.length > 1 && (
            <div className="suggestion-pics" style={options}>
              <button type="button" className="button" onClick={() => this.handlePrevBtn()}>&lt;</button>
              <button type="button" className="button" onClick={() => this.handleNextBtn()}>&gt;</button>
            </div>
          )
        }
      </div>
    );
  }
}

SuggestionPics.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
