import { actionTypes } from '../action.types';
import { alertActions } from './';
import { ticketService } from '../services/ticket.service';

export const ticketActions = {
    getAll,
    getItemById,
    addItem,
    updateItem,
    deleteItem,
};

function getAll() {
    return dispatch => {
        dispatch({ 
            type: actionTypes.TICKETS.GETALL_REQUEST 
        });

        ticketService.getAll()
        .then(
            tickets => dispatch({ 
                type: actionTypes.TICKETS.GETALL_SUCCESS, 
                tickets 
            }),
            error => dispatch({ 
                type: actionTypes.TICKETS.GETALL_FAILURE, 
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
                        ticket 
                    });
                    resolve(ticket);
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
                    item._id = res.data;
                    dispatch({ 
                        type: actionTypes.TICKETS.ADD_SUCCESS,
                        newItem: item
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