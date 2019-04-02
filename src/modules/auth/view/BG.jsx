import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { PersonOutline, Lock } from "@material-ui/icons";
import { Icon } from "@material-ui/core";
import BG from "assets/bg.jpg";

const styles = theme => ({
    bg: {
        width: "100%",
        height: "100%",
        background: `url(${BG})`,
        position: "fixed",
        top: 0
    },
    item: {
        justifyContent: "center"
    },
    text: {
        width: "100%"
    },
    "form-item-text": {
        width: "70%"
    }
});
const mapping = {
    person: <PersonOutline />,
    lock: <Lock />
};

class FormItem extends Component {
    render() {
        const { classes = {}, icon, name, type, handleChange } = this.props;
        return <div className={classes.bg} />;
    }
}

export default withStyles(styles)(FormItem);
