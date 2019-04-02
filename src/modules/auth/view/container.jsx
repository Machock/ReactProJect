import React from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../funcs/actions.js";
import { REDUCER_NAME } from "../funcs/constant";
import "../styles/index.css";
import Form from "./Form";
import BG from "./BG";

class Container extends React.Component {
    state = { ContainerList: [] };
    componentDidMount() {
        // this.props.login({ username: "mk", password: 123456 });
    }
    componentWillReceiveProps(nextProps) {
        const { isValid } = nextProps;
        if (isValid) {
            this.props.history.push("/");
        } else {
            this.props.history.push("/login");
        }
    }

    clickHandle = e => {
        // this.props.login();
    };
    render() {
        const { ContainerList } = this.state;
        const { classes, ...other } = this.props;
        return (
            <div className="login-container">
                <Form {...other} />
                <BG />
            </div>
        );
    }
}
Container.defaultProps = {};
Container.propTypes = {
    classes: PropTypes.object
};
const mapStateToProps = state => {
    console.log("state", state);
    return {
        ContainerList: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        isValid: state[REDUCER_NAME] && state[REDUCER_NAME].isValid
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: datas => {
            dispatch(actions.login(datas));
        },
        loginSuccess: () => {
            dispatch(actions.loginSuccess());
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Container));
