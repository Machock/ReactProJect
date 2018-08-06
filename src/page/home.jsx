import React from "react";
import PropTypes from "prop-types";
import { REDUCER_NAME, reducer, saga, View } from "../modules/todo/index";
import { REDUCER_NAME as Todo2_name, reducer as todo2_reducer, saga as todo2_saga, View as Todo2View } from "../modules/todo2/index";
import store, {
  injectAsyncReducer,
  sagaMiddleWare
} from "../commons/utils/store.js";
injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleWare.run(saga);
injectAsyncReducer(store, Todo2_name, todo2_reducer);
sagaMiddleWare.run(todo2_saga);
class Home extends React.Component {
  render() {
    return (
      <div>
        Home
        <View />
        <Todo2View/>
      </div>
    );
  }
}
Home.defaultProps = {};
Home.proptypes = {
  classes: PropTypes.object
};
export default Home;
