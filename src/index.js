import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import Test from "./pages/login";
import * as serviceWorker from "./serviceWorker";
import Router from "./routes";
import "./index.css";

// run saga
import { REDUCER_NAME, reducer, saga } from "modules/auth/index";
import store, { injectAsyncReducer, sagaMiddleWare } from "commons/store";
injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleWare.run(saga);

const App = () => (
    <Provider store={store}>
        {/* <IsValid /> */}
        <Router />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you wanst your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
