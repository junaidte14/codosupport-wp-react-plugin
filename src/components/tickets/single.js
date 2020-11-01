import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ticketActions } from '../../store/actions';
import Spinner from '../spinner';

const Single = (props) =>{
    const {selectedItem, setSelectedItem} = props;
    const dispatch = useDispatch();
    const ticketsState = useSelector(state => state.tickets, shallowEqual);

    const loaderStatus = ticketsState.loading;
    const myTicket = ticketsState.item;
    //console.log(myTicket);
    useEffect( () => {
        dispatch(ticketActions.getItemById(selectedItem));
    }, [dispatch]);

    return (
        <>
            {codosupport_data.user_id && loaderStatus &&
                <Spinner showBlock={true}/>
            }
            {codosupport_data.user_id && !loaderStatus &&
                <div className="codosupport-ticket">
                    <a style={{cursor: 'pointer'}} onClick={() => setSelectedItem(null)}>
                        Show All
                    </a>
                    {myTicket &&
                        <div className="list-item">
                            <h2 className="item-title">
                                {myTicket[ 'post_title' ]}
                            </h2>
                            <p className="item-description">{myTicket['post_content']}</p>
                            <p className="item-date">{myTicket['post_date']}</p>
                        </div>
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