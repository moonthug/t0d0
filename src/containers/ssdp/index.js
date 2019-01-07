import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { search } from './actions';

import Panel from '../../components/panel';

class Ssdp extends Component {
  componentDidMount() {
    this.props.search('ssdp:all');
  }

  render() {
    const { ssdp } = this.props;

    const renderServices = () => {
      if (ssdp.length === 0) {
        return <box content="Loading..." />;
      }
      // return <listtable data={ssdp.map(service => [service.urn, service.headers.LOCATION])} />;
    };

    return (
      <Panel
        label="ssdp"
        height={this.props.height}
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
      >
        {renderServices()}
      </Panel>
    );
  }
}

Ssdp.propTypes = {
  search: PropTypes.func,
  // Grid
  height: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number
};

const mapStateToProps = state => ({
  ssdp: state.get('ssdp')
});

const mapDispatchToProps = dispatch => ({
  search: urn => dispatch(search(urn))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ssdp);
