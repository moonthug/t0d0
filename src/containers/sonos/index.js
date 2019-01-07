import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Panel from '../../components/panel';
import Spinner from '../../components/spinner';
import { Grid } from 'react-blessed-contrib';
import Card from '../../components/card';

class Sonos extends Component {

  render() {
    const { sonos } = this.props;

    const renderSpinner = () => {
      if (sonos.isSearching === true) {
        return <Spinner label="Searching..." />;
      }

      if (sonos.isSearchingComplete === true && sonos.services.length === 0) {
        return <box content="Nothing found!" />;
      }
    };

    return (
      <Panel
        label="sonos"
        height={this.props.height}
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
      >
        <Grid rows={4} cols={1}>
          <Card row={0} col={0} rowSpan={3} colSpan={1}>
            <listtable
              data={sonos.services.map(service => [
                service.device.host,
                service.description.roomName
              ])}
            />
          </Card>
          <box row={3} col={0} rowSpan={1} colSpan={1}>
            {renderSpinner()}
          </box>
        </Grid>
      </Panel>
    );
  }
}

Sonos.propTypes = {
  // Redux actions
  discoverDevices: PropTypes.func,

  // Redux state
  sonos: PropTypes.arrayOf(PropTypes.object),

  // Grid
  height: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number
};

const mapStateToProps = state => ({
  sonos: state.get('sonos')
});

export default connect(
  mapStateToProps
)(Sonos);
