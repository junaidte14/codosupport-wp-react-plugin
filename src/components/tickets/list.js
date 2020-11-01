import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ticketActions } from '../../store/actions';
import Spinner from '../spinner';

const List = (props) =>{
    const {setSelectedItem} = props;
    const dispatch = useDispatch();
    const ticketsState = useSelector(state => state.tickets, shallowEqual);

    const loaderStatus = ticketsState.loading;
    const myTickets = ticketsState.items;
    useEffect( () => {
        dispatch(ticketActions.getAll(codosupport_data.user_id));
    }, [dispatch]);

    return (
        <>
            {codosupport_data.user_id && loaderStatus &&
                <Spinner showBlock={true}/>
            }
            {codosupport_data.user_id && !loaderStatus &&
                <div className="codosupport-tickets-list">
                    {myTickets && myTickets.length &&
                        myTickets.map(item => {
                            return (
                                <div key={item.ID} className="list-item">
                                    <h2 className="item-title">
                                        <a style={{cursor: 'pointer'}} onClick={() => setSelectedItem(item.ID)}>
                                            {item[ 'post_title' ]}
                                        </a>
                                    </h2>
                                    <p className="item-description">{item['post_content']}</p>
                                    <p className="item-date">{item['post_date']}</p>
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

export default List;