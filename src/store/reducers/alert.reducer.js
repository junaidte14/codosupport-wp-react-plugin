import { actionTypes } from '../action.types';

export function alert(state = {}, action) {
  switch (action.type) {
    case actionTypes.ALERT.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case actionTypes.ALERT.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case actionTypes.ALERT.CLEAR:
      return {};
    default:
      return state
  }
}