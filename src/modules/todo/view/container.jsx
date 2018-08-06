import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../funcs/actions.js";
import { REDUCER_NAME } from "../funcs/constant";

class Todo extends React.Component {
  state = { todoList: [] };
  componentWillReceiveProps = nextProps => {
    const { todoList } = nextProps;
    this.setState({
      todoList
    });
  };

  clickHandle = e => {
    this.props.getTodoList();
  };
  render() {
    const { todoList } = this.state;
    return (
      <div>
        <button onClick={this.clickHandle}>Click Me Todo1</button>
        <ul>
          {todoList.map((n, i) => {
            return <li key={i}>{n.msg}</li>;
          })}
        </ul>
      </div>
    );
  }
}
Todo.defaultProps = {};
Todo.proptypes = {
  classes: PropTypes.object
};
const mapStateToProps = state => {
  return {
    todoList: state[REDUCER_NAME] && state[REDUCER_NAME].payload
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTodoList: () => {
      dispatch(actions.getTodoList());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
