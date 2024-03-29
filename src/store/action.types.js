export const actionTypes = {
    ALERT: {
        SUCCESS: 'ALERT_SUCCESS',
        ERROR: 'ALERT_ERROR',
        CLEAR: 'ALERT_CLEAR',
    },
    TICKETS: {
        GETALL_REQUEST: 'GETALL_REQUEST',
        GETALL_SUCCESS: 'GETALL_SUCCESS',
        GETALL_FAILURE: 'GETALL_FAILURE',

        GETALLBYATTR_REQUEST: 'GETALLBYATTR_REQUEST',
        GETALLBYATTR_SUCCESS: 'GETALLBYATTR_SUCCESS',
        GETALLBYATTR_FAILURE: 'GETALLBYATTR_FAILURE',

        GETBYID_REQUEST: 'GETBYID_REQUEST',
        GETBYID_SUCCESS: 'GETBYID_SUCCESS',
        GETBYID_FAILURE: 'GETBYID_FAILURE',

        ADD_REQUEST: 'ADD_REQUEST',
        ADD_SUCCESS: 'ADD_SUCCESS',
        ADD_FAILURE: 'ADD_FAILURE',

        UPLOAD_REQUEST: 'UPLOAD_REQUEST',
        UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
        UPLOAD_FAILURE: 'UPLOAD_FAILURE',

        REMOVE_REQUEST: 'REMOVE_REQUEST',
        REMOVE_SUCCESS: 'REMOVE_SUCCESS',
        REMOVE_FAILURE: 'REMOVE_FAILURE'
    },
    PRODUCTS: {
        GETALL_REQUEST: 'GETALL_REQUEST',
        GETALL_SUCCESS: 'GETALL_SUCCESS',
        GETALL_FAILURE: 'GETALL_FAILURE'
    }
};