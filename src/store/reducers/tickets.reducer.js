import { actionTypes } from '../action.types';

const initialState = {
  loading: true,
  childLoading: true,
  actionLoader: false,
  items: [],
  childItems: [],
  item: [],
  error: null
};
export function tickets(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TICKETS.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.TICKETS.GETALL_SUCCESS:
      return {
        ...state,
        items: action.tickets.data,
        childLoading: false,
        actionLoader: false,
        loading: false
      }
    case actionTypes.TICKETS.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    case actionTypes.TICKETS.GETALLBYATTR_REQUEST:
      return {
        ...state,
        childLoading: true
      }
    case actionTypes.TICKETS.GETALLBYATTR_SUCCESS:
      return {
        ...state,
        childItems: action.tickets.data,
        childLoading: false,
        actionLoader: false,
        loading: false
      }
    case actionTypes.TICKETS.GETALLBYATTR_FAILURE:
      return {
        ...state,
        error: action.error,
        childLoading: false,
      }
    
    case actionTypes.TICKETS.GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.TICKETS.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.ticket.data,
        childLoading: false,
        actionLoader: false,
        loading: false
      }
    case actionTypes.TICKETS.GETBYID_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
        actionLoader: false
      }

    case actionTypes.TICKETS.ADD_REQUEST:
      return {
        ...state,
        actionLoader: true
      }
    case actionTypes.TICKETS.ADD_SUCCESS:
      return {
        ...state,
        items: (action.tpye == 'ticket')? [...state.items, action.newItem]: [...state.items],
        childItems: (action.tpye == 'history')? [...state.childItems, action.newItem]: [...state.childItems],
        childLoading: false,
        actionLoader: false,
        loading: false
      }
    case actionTypes.TICKETS.ADD_FAILURE:
      return {
        ...state,
        error: action.error,
        actionLoader: false
      }

    case actionTypes.TICKETS.UPLOAD_REQUEST:
      return {
        ...state,
        actionLoader: true
      }
    case actionTypes.TICKETS.UPLOAD_SUCCESS:
      return {
        ...state,
        childLoading: false,
        actionLoader: false,
        loading: false
      }
    case actionTypes.TICKETS.UPLOAD_FAILURE:
      return {
        ...state,
        error: action.error,
        actionLoader: false
      }

    case actionTypes.TICKETS.REMOVE_REQUEST:
      return {
        ...state,
        actionLoader: true
      }
    case actionTypes.TICKETS.REMOVE_SUCCESS:
      return {
        ...state,
        childLoading: false,
        actionLoader: false,
        loading: false
      }
    case actionTypes.TICKETS.REMOVE_FAILURE:
      return {
        ...state,
        error: action.error,
        actionLoader: false
      }

    case actionTypes.TICKETS.UPDATE_REQUEST:
      return {
        ...state,
        actionLoader: true
      }
    case actionTypes.TICKETS.UPDATE_SUCCESS:
      {
        const newItems = state.items.map((item)=>{
          if(item._id === action.id) {
            return action.tickets
          } else return item;
        });
        return {
          ...state,
          items: newItems,
          item: action.tickets,
          childLoading: false,
          actionLoader: false,
          loading: false
        }
      }
    case actionTypes.TICKETS.UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
        actionLoader: false
      }

    case actionTypes.TICKETS.DELETE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.TICKETS.DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(e => e._id !== action.id),
        childLoading: false,
        actionLoader: false,
        loading: false
      }
    case actionTypes.TICKETS.DELETE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state
  }
}