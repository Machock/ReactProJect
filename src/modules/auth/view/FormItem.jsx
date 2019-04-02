import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { PersonOutline, Lock } from "@material-ui/icons";
import { Icon } from "@material-ui/core";

const styles = theme => ({
    margin: {
        // margin: theme.spacing.unit
    },
    item: {
        justifyContent: "center",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
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
        return (
            // <div className={classes.margin}>
            <Grid
                container
                className={classes.item}
                spacing={8}
                alignItems="flex-end"
            >
                <Grid item>{mapping[icon]}</Grid>
                <Grid item className={classes["form-item-text"]}>
                    <TextField
                        className={classes.text}
                        label=""
                        onChange={handleChange}
                        type={type}
                        name={name}
                    />
                </Grid>
            </Grid>
            // </div>
        );
    }
}

export default withStyles(styles)(FormItem);
