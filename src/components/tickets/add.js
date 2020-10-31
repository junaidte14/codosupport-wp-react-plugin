import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ticketActions, alertActions } from '../../store/actions';
import Spinner from '../spinner';

const AddForm = () =>{

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;

        switch(name){
            case 'title':
                setTitle(value);
                break;
            case 'product':
                setProduct(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    }

    const submitForm = (e) =>{
        e.preventDefault();
        setSubmitted(true);
        let tempItem = {
            title: title,
            product: product,
            description: description
        }
        if (tempItem.title && tempItem.description) {
            dispatch(ticketActions.addItem(tempItem)).then(res => {
                setSubmitted(false);
                if(res.type && res.type == 'success'){
                    setTitle('');
                    setDescription('');
                    setProduct('');
                }
            });
        }else{
            dispatch(alertActions.error('Please fill required fields'));
        }
    }

    const loading = useSelector(state => {
        return state.tickets.actionLoader;
    });

    return (
        <div className="card textcenter mt-20 rounded-0">
            <div className="card-body">
                <h2>Add Support Ticket</h2>
                <div className="mb-2">
                    <input type="text" className={'form-control' + (submitted && !title ? ' is-invalid' : '')} name="title" placeholder="Title" value={title} onChange={handleChange}/>
                    {submitted && !title &&
                        <div className="invalid-feedback">Title is required</div>
                    }
                </div>

                <div className="mb-2">
                    <select value={product} name="product" className="form-control" onChange={handleChange}> 
                        <option value="">All Products</option>
                        {codosupport_data.products &&
                            codosupport_data.products.map(item => {
                            return (<option value={item['ID']} key={item.ID}>{item[ 'post_title' ]}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="mb-2">
                    <textarea className={'form-control' + (submitted && !description ? ' is-invalid' : '')} name="description" placeholder="Description" value={description} onChange={handleChange}></textarea>
                    {submitted && !description &&
                        <div className="invalid-feedback">Description is required</div>
                    }
                </div>

                <div className="mb-2">
                    <button className="btn btn-primary ml-auto rounded-0" onClick={submitForm}>Save</button>
                    {loading &&
                        <Spinner showBlock={false}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default AddForm;