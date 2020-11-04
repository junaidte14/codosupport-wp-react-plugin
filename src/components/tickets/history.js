import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ticketActions } from '../../store/actions';
import Spinner from '../spinner';

const TicketHistory = (props) =>{
    const {selectedItem} = props;
    const dispatch = useDispatch();
    const ticketsState = useSelector(state => state.tickets, shallowEqual);

    const loaderStatus = ticketsState.childLoading;
    const ticketHistory = ticketsState.childItems;
    useEffect( () => {
        dispatch(ticketActions.getAllByAttr(selectedItem));
    }, [dispatch, selectedItem]);

    return (
        <>
            {codosupport_data.user_id && loaderStatus &&
                <Spinner showBlock={true}/>
            }
            {codosupport_data.user_id && !loaderStatus &&
                <div className="codosupport-history-list">
                    {ticketHistory && ticketHistory.length !== 0 &&
                        ticketHistory.map(item => {
                            return (
                                <div key={item.ID} className="history-list-item">
                                    <p className="item-bg-title codoflex-nav-wrapper" 
                                        style={{
                                            backgroundColor: codosupport_data.theme_bg_color,
                                            color: codosupport_data.theme_color
                                        }}>
                                        <span className="item-user">{item['display_name']}</span>
                                        <span className="codoflex-nav-spacer"></span>
                                        <span className="item-date">{item['post_date']}</span>
                                    </p>
                                    <p className="item-description">{item['post_content']}</p>
                                    {item['attachments'] && item['attachments'].length !== 0 &&
                                        <div className="item-attachments">
                                            <p className="meta-entry-key">Attachment(s):</p>
                                            {
                                                item['attachments'].map(item => {
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
                            )
                        })
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

export default TicketHistory;