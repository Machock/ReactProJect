import createReducer from "commons/utils/reducerHelper";
import * as actionTypes from "./actionTypes";

const initState = {
    isValid: false
};

const reducers = {
    [actionTypes.LOGIN_REQUEST_FAILD](state, action) {
        console.log("faild")
        return {
            ...state,
            isValid: false
        };
    },
    [actionTypes.LOGIN_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            isValid: true
        };
    }
};

export default createReducer(Object.assign({}, initState), reducers);
