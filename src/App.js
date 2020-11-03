import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from './helper_functions';
import './App.css';
import AddForm from './components/tickets/add';
import List from './components/tickets/list';
import Single from './components/tickets/single';
const App = () =>{

  const [ticketView, setTicketView] = useState('viewTickets');
  const [historyView, setHistoryView] = useState('viewHistory');
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();
  history.listen((location, action) => {
      dispatch(alertActions.clear());
  });

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="codosupport-app">
      {alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      <div className="codosupport-content">
        <div className="codoflex-nav-wrapper">
            <button style={{cursor: 'pointer', marginRight: '5px',
              backgroundColor: codosupport_data.theme_bg_color,
              borderColor: codosupport_data.theme_bg_color,
              color: codosupport_data.theme_color}} onClick={() => {setTicketView('viewTickets'); setSelectedItem(null);}}>
                My Tickets
            </button>
            <button style={{
              cursor: 'pointer', 
              marginRight: '5px', 
              backgroundColor: codosupport_data.theme_bg_color,
              borderColor: codosupport_data.theme_bg_color,
              color: codosupport_data.theme_color}} onClick={() => setTicketView('addTicket')}>
                Add Ticket
            </button>
            {
              (selectedItem) &&
              <>
                {
                  (historyView == 'viewHistory') && 
                  <button style={{cursor: 'pointer',
                    backgroundColor: codosupport_data.theme_bg_color,
                    borderColor: codosupport_data.theme_bg_color,
                    color: codosupport_data.theme_color}} onClick={() => setHistoryView('addHistory')}>
                      Add Ticket History
                  </button>
                }
                {
                  (historyView == 'addHistory') && 
                  <button style={{cursor: 'pointer',
                    backgroundColor: codosupport_data.theme_bg_color,
                    borderColor: codosupport_data.theme_bg_color,
                    color: codosupport_data.theme_color}} onClick={() => setHistoryView('viewHistory')}>
                      View Ticket History
                  </button>
                }
              </>
            }
            <span className="codoflex-nav-spacer"></span>
            
        </div>
        {codosupport_data.user_id &&
          <>
            {
              (ticketView === 'addTicket') && 
                <AddForm 
                  type='ticket' 
                  parent={0} 
                  setSelectedItem={setSelectedItem} 
                  setTicketView={setTicketView}
                  setHistoryView={setHistoryView}
                />
            }
            {
              (ticketView === 'viewTickets') && 
                <>
                  {!selectedItem &&
                    <List setSelectedItem={setSelectedItem} setHistoryView={setHistoryView} setTicketView={setTicketView}/>
                  }
                  {selectedItem &&
                    <Single 
                      selectedItem={selectedItem} 
                      historyView={historyView}
                      setSelectedItem={setSelectedItem} 
                      setTicketView={setTicketView}
                      setHistoryView={setHistoryView}/>
                  }
                </>
            }
          </>
        }
        {!codosupport_data.user_id &&
          <div className={`alert alert-danger`}>
            Please login to submit a support ticket! 
            <a href={codosupport_data.login_url}>Login</a>
          </div>
        }
      </div>
    </div>
  );

}

export default App;
