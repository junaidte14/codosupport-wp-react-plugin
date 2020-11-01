import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from './helper_functions';
import './App.css';
import AddForm from './components/tickets/add';
import List from './components/tickets/list';
import Single from './components/tickets/single';
const App = () =>{

  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();
  history.listen((location, action) => {
      dispatch(alertActions.clear());
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const openCity = (item) => {
    let tabcontent = jQuery('.codosupport-tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById('codo-tab-content-'+item).style.display = "block";
    let tablinks = jQuery('.codosupport-tab .tablinks');
    for (let i = 0; i < tablinks.length; i++) {
      jQuery(tablinks[i]).removeClass('active');
    }
    jQuery('#codo-tab-link-'+item).addClass('active');
  }

  return (
    <div className="codosupport-app">
      {alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      <div className="codosupport-content">
        <div className="codosupport-tab">
          <button className="tablinks active" id="codo-tab-link-1" onClick={(e) => openCity('1')}>Add Ticket</button>
          <button className="tablinks" id="codo-tab-link-2" onClick={(e) => openCity('2', this)}>My Tickets</button>
        </div>

        <div id="codo-tab-content-1" className="codosupport-tabcontent" style={{display: 'block'}}>
          {codosupport_data.user_id &&
            <AddForm />
          }
          {!codosupport_data.user_id &&
            <div className={`alert alert-danger`}>
              Please login to submit a support ticket! 
              <a href={codosupport_data.login_url}>Login</a>
            </div>
          }
        </div>

        <div id="codo-tab-content-2" className="codosupport-tabcontent">
          {!selectedItem &&
            <List setSelectedItem={setSelectedItem}/>
          }
          {selectedItem &&
            <Single selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
          }
        </div>
      </div>
    </div>
  );

}

export default App;
