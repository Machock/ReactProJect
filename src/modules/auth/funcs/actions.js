import * as actionTypes from "./actionTypes";

export const login = ({ username = "", password = "" }) => {
    console.log("AAAAAAAAAAAAAAA")
    return {
        username,
        password,
        type: actionTypes.LOGIN_REQUEST
    };
};

export const loginSuccess = payload => ({
    payload,
    type: actionTypes.LOGIN_REQUEST_SUCCESS
});

export const loginFailr = () => ({
    type: actionTypes.LOGIN_REQUEST_FAILD
});
