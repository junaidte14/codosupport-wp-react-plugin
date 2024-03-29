import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ticketActions } from '../../store/actions';
import Spinner from '../spinner';

const List = (props) =>{
    const {setSelectedItem, setHistoryView, setTicketView} = props;
    const dispatch = useDispatch();
    const [paged, setPaged] = useState(0);
    const [numPages, setNumPages] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    const ticketsState = useSelector(state => state.tickets, shallowEqual);

    const loaderStatus = ticketsState.loading;
    const myTickets = ticketsState.items;
    useEffect( () => {
        dispatch(ticketActions.getAll(codosupport_data.user_id, 0, paged, postsPerPage)).then(res => {
            setNumPages(Math.ceil(res.total_items/postsPerPage));
        });
    }, [dispatch, paged]);

    return (
        <>
            {codosupport_data.user_id && loaderStatus &&
                <Spinner showBlock={true}/>
            }
            {codosupport_data.user_id && !loaderStatus &&
                <div className="codosupport-tickets-list">
                    {myTickets && myTickets.length !== 0 &&
                        myTickets.map(item => {
                            return (
                                <div key={item.ID} className="list-item">
                                    <h2 className="item-title">
                                        <a style={{cursor: 'pointer', color: codosupport_data.theme_bg_color}} onClick={() => {setSelectedItem(item.ID); setHistoryView('viewHistory')}}>
                                            {item[ 'post_title' ]}
                                        </a>
                                    </h2>
                                    <p className="item-description">{(item['post_content'].length > 100) ? item['post_content'].substring(0,100)+' ...': item['post_content']}</p>
                                    <p className="item-date">{item['post_date']}</p>
                                </div>
                            )
                        })
                    }
                    {myTickets && myTickets.length !== 0 && numPages > 1 &&
                        <div className="codosupport-pagination">
                            {numPages && paged > 0 > 0 &&
                                <> 
                                    <button onClick={() => {setPaged(0);}}>{'<<'}</button>
                                    <button onClick={() => {setPaged(paged-1);}}>{'<'}</button>
                                </>
                            }
                            {numPages > 0 && 
                                Array.from(Array(numPages), (e, i) => {
                                    return (
                                        <button key={i+1} className={(paged == i)? 'active': ''} onClick={() => {setPaged(i);}}>{i+1}</button>
                                    );
                                })
                            }
                            {numPages > 0 && paged !== (numPages-1) && 
                                <>
                                    <button onClick={() => {setPaged(paged+1);}}>{'>'}</button>
                                    <button onClick={() => {setPaged(numPages-1);}}>{'>>'}</button>
                                </>
                            }
                        </div>
                    }
                    {myTickets && myTickets.length === 0 &&
                        <p>No ticket exist. <a style={{cursor: 'pointer', color: codosupport_data.theme_bg_color}} onClick={() => {setTicketView('addTicket')}}>Add new Ticket.</a></p>
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

export default List;