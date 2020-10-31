import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { tickets } from './tickets.reducer';

const rootReducer = combineReducers({
  alert,
  tickets
});

export default rootReducer;