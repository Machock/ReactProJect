import React, { Component } from "react";
import PropTypes from "prop-types";
import { REDUCER_NAME, reducer, saga, View, actions } from "modules/auth/index";
import store, { injectAsyncReducer, sagaMiddleWare } from "commons/store";
import { Button } from "@material-ui/core";
injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleWare.run(saga);
class Home extends Component {
    clickHandle = () => {
        store.dispatch(actions.loginFailr());
    };
    render() {
        return (
            <div>
                XXXXXXXXXXXXXXX
                <Button onClick={this.clickHandle}>Jump Login Page</Button>
            </div>
        );
    }
}

Home.defaultProps = {};
Home.propTypes = {};

export default Home;
