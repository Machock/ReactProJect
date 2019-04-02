import React, { Component } from "react";
import PropTypes from "prop-types";
import { REDUCER_NAME, reducer, saga, View } from "modules/auth/index";
// import store, { injectAsyncReducer, sagaMiddleWare } from "commons/store";
// injectAsyncReducer(store, REDUCER_NAME, reducer);
// sagaMiddleWare.run(saga);
class Login extends Component {
    render() {
        return <View />;
    }
}

Login.defaultProps = {};
Login.propTypes = {};

export default Login;
