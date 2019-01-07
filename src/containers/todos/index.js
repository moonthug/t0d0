import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCardsForBoard } from './actions';

import Panel from '../../components/panel';
import Spinner from '../../components/spinner';
import Todo from '../../components/todo';

class Todos extends Component {
  componentDidMount() {
    this.props.getCardsForBoard('5b0f2f7a05b72049f53c0ce2');
  }

  render() {
    const { todos } = this.props;

    const renderTodos = () => {
      if (todos.length === 0) {
        return <Spinner label="Loading..." />;
      }

      if (todos.isFailed === true) {
        return <box content="Fail!" />;
      }

      return todos.map((todo, i) => (
        <Todo key={i} todo={todo} top={i * 5} height={5} />
      ));
    };

    return (
      <Panel
        label="todos"
        height={this.props.height}
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
      >
        {renderTodos()}
      </Panel>
    );
  }
}

Todos.propTypes = {
  // Redux actions
  getCardsForBoard: PropTypes.func,

  // Redux state
  todos: PropTypes.arrayOf(PropTypes.object),

  // Grid
  height: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number
};

const mapStateToProps = state => ({
  todos: state.get('todos')
});

const mapDispatchToProps = dispatch => ({
  getCardsForBoard: id => dispatch(getCardsForBoard(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
