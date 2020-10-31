import { actionTypes } from '../action.types';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: actionTypes.ALERT.SUCCESS, message };
}

function error(message) {
    return { type: actionTypes.ALERT.ERROR, message };
}

function clear() {
    return { type: actionTypes.ALERT.CLEAR };
}