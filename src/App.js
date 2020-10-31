import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { history } from './helper_functions';
import { ticketActions } from './store/actions';
import './App.css';
import AddForm from './components/tickets/add';
const App = () =>{

  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();
  history.listen((location, action) => {
      dispatch(alertActions.clear());
  });
  return (
    <div className="App">
      {alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      {codosupport_data.user_id &&
        <AddForm />
      }
      {!codosupport_data.user_id &&
        <div className={`alert aler-error`}>Please login to submit a support ticket! <a href={codosupport_data.login_url}>Login</a></div>
      }
    </div>
  );

}

export default App;
