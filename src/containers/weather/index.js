import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Panel from '../../components/panel';
import Spinner from '../../components/spinner';
import WeatherComponent from '../../components/weather';

class Weather extends Component {
  render() {
    const { weather } = this.props;

    const renderWeather = () => {
      if (weather.isLoading === true) {
        return <Spinner content="Loading..." />;
      }

      if (weather.isFailed === true) {
        return <box content="Fail!" />;
      }

      if (weather.isLoaded === true) {
        return <WeatherComponent weather={weather.data}/>;
      }
    };

    return (
      <Panel
        label="weather"
        height={this.props.height}
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
      >
        {renderWeather()}
      </Panel>
    );
  }
}

Weather.propTypes = {
  // Redux state
  weather: PropTypes.shape({
    isLoading: PropTypes.bool,
    isFailed: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.object
  }),

  // Grid
  height: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number
};

const mapStateToProps = state => ({
  weather: state.get('weather')
});

export default connect(
  mapStateToProps
)(Weather);
