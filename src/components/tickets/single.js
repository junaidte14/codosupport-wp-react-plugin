import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ticketActions } from '../../store/actions';
import Spinner from '../spinner';
import AddForm from './add';
import TicketHistory from './history';
import codoPadLeadingZeros from '../../helper_functions/padded_zeros';

const Single = (props) =>{
    const {selectedItem, historyView, setSelectedItem, setTicketView, setHistoryView} = props;
    const dispatch = useDispatch();
    const ticketsState = useSelector(state => state.tickets, shallowEqual);

    const loaderStatus = ticketsState.loading;
    const myTicket = ticketsState.item;
    useEffect( () => {
        dispatch(ticketActions.getItemById(selectedItem));
    }, [dispatch]);

    return (
        <>
            {codosupport_data.user_id && loaderStatus &&
                <Spinner showBlock={true}/>
            }
            {codosupport_data.user_id && !loaderStatus &&
                <div className="codosupport codosupport-ticket">
                    {myTicket &&
                        <>
                            <div className="codo-w-main">
                                {
                                    (historyView == 'addHistory') &&
                                        <div className="add-history">
                                            <AddForm 
                                                type='history' 
                                                parent={selectedItem}
                                                setSelectedItem={setSelectedItem} 
                                                setTicketView={setTicketView}
                                                setHistoryView={setHistoryView}
                                            />
                                        </div>
                                }
                                {
                                    (historyView == 'viewHistory') &&
                                        <div className="item-history">
                                            <TicketHistory selectedItem={selectedItem}/>
                                        </div>
                                }
                                <div className="list-item-details">
                                    <p className="item-bg-title codoflex-nav-wrapper" 
                                        style={{
                                            backgroundColor: codosupport_data.theme_bg_color,
                                            color: codosupport_data.theme_color
                                        }}>
                                        <span className="item-user">{myTicket['display_name']}</span>
                                        <span className="codoflex-nav-spacer"></span>
                                        <span className="item-date">{myTicket['post_date']}</span>
                                    </p>
                                    <p className="item-description">
                                        {myTicket['post_content']}
                                    </p>
                                    {myTicket['attachments'] && myTicket['attachments'].length !== 0 &&
                                        <div className="item-attachments">
                                            <p className="meta-entry-key">Attachment(s):</p>
                                            {
                                                myTicket['attachments'].map(item => {
                                                    return (
                                                        <div key={item['attach_id']}>
                                                            <a href={item['url']} style={{cursor: 'pointer', color: codosupport_data.theme_bg_color}} target="_blank">{item['name']}</a>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="codo-w-side">
                                <div className="list-item-meta">
                                    <p className="item-bg-title codoflex-nav-wrapper" 
                                        style={{
                                            backgroundColor: codosupport_data.theme_bg_color,
                                            color: codosupport_data.theme_color
                                        }}>
                                        <span>Ticket Details</span>
                                    </p>
                                    {myTicket[ 'number' ] && myTicket[ 'number' ] != 0 &&
                                    <>
                                        <p className="meta-entry-key">Number:</p>
                                        <p className="meta-entry-value">
                                            {codoPadLeadingZeros(myTicket[ 'number' ], 5)}
                                        </p>
                                    </>
                                    }
                                    <p className="meta-entry-key">Title:</p>
                                    <p className="meta-entry-value">{myTicket[ 'post_title' ]}</p>
                                    {/* <p className="meta-entry-key">Product:</p>
                                    <p className="meta-entry-value">{myTicket[ 'product' ]}</p> */}
                                    <p className="meta-entry-key">Submitted By:</p>
                                    <p className="meta-entry-value">{myTicket['display_name']}</p>
                                    {/* <p className="meta-entry-key">Assigned To:</p>
                                    <p className="meta-entry-value">{myTicket['respondent_display_name']}</p> */}
                                    <p className="meta-entry-key">Date:</p>
                                    <p className="meta-entry-value">{myTicket['post_date']}</p>
                                </div>
                            </div>
                        </>
                    }
                    {!myTicket &&
                        <p>The requested ticket does not exist!</p>
                    }
                </div>
            }
            {!codosupport_data.user_id &&
                <div className={`alert alert-danger`}>
                    Please login to submit a support ticket! 
                    <a href={codosupport_data.login_url}>Login</a>
                </div>
            }
        </>
    );
}

export default Single;