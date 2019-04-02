import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import IsValid from "./components/isValid";
const Routes = () => {
    return (
        <Router basename="/">
            <Switch>
                {/* <Route component={IsValid} /> */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default Routes;
