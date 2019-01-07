import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getShoppingList } from './actions';

import Panel from '../../components/panel';
import Spinner from '../../components/spinner';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getShoppingList();
  }

  render() {
    const { shoppingList } = this.props;

    const renderShoppingList = () => {
      if (shoppingList.length === 0) {
        return <Spinner label="Loading..." />;
      }

      return (
        <listtable
          tags={true}
          data={shoppingList.data.map(item => {
            return [item.content, item.priority.toString()];
          })}
        />
      );
    };

    return (
      <Panel
        label="shopping list"
        height={this.props.height}
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
      >
        {renderShoppingList()}
      </Panel>
    );
  }
}

ShoppingList.propTypes = {
  // Redux actions
  getShoppingList: PropTypes.func,

  // Redux state
  shoppingList: PropTypes.arrayOf(PropTypes.object),

  // Grid
  height: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number
};

const mapStateToProps = state => ({
  shoppingList: state.get('shoppingList')
});

const mapDispatchToProps = dispatch => ({
  getShoppingList: () => dispatch(getShoppingList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
