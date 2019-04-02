import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormItem from "./FormItem";
import { Button } from "@material-ui/core";
import spacing from "@material-ui/core/styles/spacing";

const formGroups = [
    { icon: "person", name: "username", type: "text" },
    { icon: "lock", name: "password", type: "password" }
];

const styles = theme => ({
    button: {
        width: "80%",
        margin: spacing.unit * 2,
        borderRadius: 20
    },
    container: {
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        transform: "translateY(200%)"
    }
});

class Form extends Component {
    state = {
        password: "",
        username: ""
    };
    handleChange = e => {
        let value = e.target.value.trim();
        this.setState({
            [e.target.name]: value
        });
    };
    signIn = () => {
        const { password, username } = this.state;
        this.props.login({ password, username });
        // this.props.loginSuccess([])
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {formGroups.map(item => (
                    <FormItem
                        {...item}
                        key={item.name}
                        handleChange={this.handleChange}
                    />
                ))}
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={classes.button}
                    onClick={this.signIn}
                >
                    Sign In
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Form);
