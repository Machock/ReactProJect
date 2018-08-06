import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./page/home.jsx";
import {Provider} from "react-redux"
import store from "./commons/utils/store"
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Provider store={store}><Home /></Provider>, document.getElementById("root"));
registerServiceWorker();
