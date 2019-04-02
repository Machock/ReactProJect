import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

class Container extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { isValid } = nextProps;
        if (!isValid) {
            this.props.history.push("/login");
        } else {
            this.props.history.push("/");
        }
    }
    render() {
        return null;
    }
}
Container.defaultProps = {};
Container.propTypes = {};
const mapStateToProps = state => {
    debugger;
    return {
        isValid: state["identify"] && state["identify"].isValid
    };
};
const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(
    mapStateToProps,
    null
)(withRouter(Container));
