import { actionTypes } from '../action.types';
import { alertActions } from './';
import { ticketService } from '../services/ticket.service';

export const ticketActions = {
    getAll,
    getAllByAttr,
    getItemById,
    addItem,
    updateItem,
    deleteItem,
    uploadFiles,
    removeFile
};

function getAll(user_id) {
    return dispatch => {
        dispatch({ 
            type: actionTypes.TICKETS.GETALL_REQUEST 
        });

        ticketService.getAll(user_id)
        .then(
            (tickets) => {
                dispatch({ 
                    type: actionTypes.TICKETS.GETALL_SUCCESS, 
                    tickets 
                })
            },
            error => dispatch({ 
                type: actionTypes.TICKETS.GETALL_FAILURE, 
                error 
            })
        );
    };
}

function getAllByAttr(parent) {
    return dispatch => {
        dispatch({ 
            type: actionTypes.TICKETS.GETALLBYATTR_REQUEST 
        });

        ticketService.getAll(null, parent)
        .then(
            (tickets) => {
                dispatch({ 
                    type: actionTypes.TICKETS.GETALLBYATTR_SUCCESS, 
                    tickets 
                })
            },
            error => dispatch({ 
                type: actionTypes.TICKETS.GETALLBYATTR_FAILURE, 
                error 
            })
        );
    };
}

function getItemById(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({ 
                type: actionTypes.TICKETS.GETBYID_REQUEST
            });
    
            ticketService.getItemById(id)
            .then(
                ticket => {
                    dispatch({ 
                        type: actionTypes.TICKETS.GETBYID_SUCCESS, 
                        ticket: ticket
                    });
                    resolve(ticket.data);
                },
                error => {
                    dispatch({ 
                        type: actionTypes.TICKETS.GETBYID_FAILURE, 
                        error 
                    });
                    reject();
                }
            );
        });
    };
}

function addItem(item) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({ 
                type: actionTypes.TICKETS.ADD_REQUEST 
            });

            ticketService.addItem(item)
            .then(
                res => {
                    dispatch({ 
                        type: actionTypes.TICKETS.ADD_SUCCESS,
                        newItem: res.data,
                        type: item.type
                    });
                    dispatch(alertActions.success('Item is successfully added!'));
                    resolve(res);
                },
                error => {
                    dispatch({ 
                        type: actionTypes.TICKETS.ADD_FAILURE, 
                        error 
                    });
                    dispatch(alertActions.error(error));
                    reject();
                }
            );
        });
    };
}

function uploadFiles(files) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({ 
                type: actionTypes.TICKETS.UPLOAD_REQUEST 
            });

            ticketService.uploadFiles(files)
            .then(
                res => {
                    dispatch({ 
                        type: actionTypes.TICKETS.UPLOAD_SUCCESS,
                    });
                    dispatch(alertActions.success('Files are successfully uploaded!'));
                    resolve(res);
                },
                error => {
                    dispatch({ 
                        type: actionTypes.TICKETS.UPLOAD_FAILURE, 
                        error 
                    });
                    dispatch(alertActions.error(error));
                    reject();
                }
            );
        });
    };
}

function removeFile(attach_id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({ 
                type: actionTypes.TICKETS.REMOVE_REQUEST 
            });

            ticketService.removeFile(attach_id)
            .then(
                res => {
                    dispatch({ 
                        type: actionTypes.TICKETS.REMOVE_SUCCESS,
                    });
                    dispatch(alertActions.success('File is successfully deleted!'));
                    resolve(res);
                },
                error => {
                    dispatch({ 
                        type: actionTypes.TICKETS.REMOVE_FAILURE, 
                        error 
                    });
                    dispatch(alertActions.error(error));
                    reject();
                }
            );
        });
    };
}

function updateItem(id, item) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({ 
                type: actionTypes.TICKETS.UPDATE_REQUEST 
            });

            ticketService.updateItem(id, item)
            .then(
                res => {
                    dispatch({ 
                        type: actionTypes.TICKETS.UPDATE_SUCCESS,
                        id,
                        ticket: item
                    });
                    dispatch(alertActions.success('Item is successfully updated!'));
                    resolve(res);
                },
                error => {
                    dispatch({ 
                        type: actionTypes.TICKETS.UPDATE_FAILURE, 
                        error 
                    });
                    dispatch(alertActions.error(error));
                    reject();
                }
            );
        });
    };
}

function deleteItem(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({ 
                type: actionTypes.TICKETS.DELETE_REQUEST 
            });

            ticketService.deleteItem(id)
            .then(
                res => {
                    dispatch({ 
                        type: actionTypes.TICKETS.DELETE_SUCCESS,
                        id
                    });
                    dispatch(alertActions.success('Item is successfully deleted!'));
                    resolve(res);
                },
                error => {
                    dispatch({ 
                        type: actionTypes.TICKETS.DELETE_FAILURE, 
                        error 
                    });
                    dispatch(alertActions.error(error));
                    reject();
                }
            );
        });
    };
}