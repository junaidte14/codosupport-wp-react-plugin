import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ticketActions, alertActions } from '../../store/actions';
import Spinner from '../spinner';

const AddForm = () =>{

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
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

    const uploadFiles = (e) => {
        e.preventDefault;
        let files_data = jQuery('#codosupport-files').prop('files');
        let imgForm = jQuery('#codosupport-img-form')[0];
        let formData = new FormData(imgForm);
        for(let i=0; i<files_data.length; i++) {
            formData.append('files[]', files_data[i]);
        }
        formData.append('action', 'codosupport_upload_files');
        formData.append('nonce', codosupport_data.nonce);

        dispatch(ticketActions.uploadFiles(formData)).then(res => {
            jQuery('#codosupport-files').val('');
            if(res.data && res.data.length){
                setAttachments(res.data);
            }
        });
    }

    const removeFile = (attach_id) => {
        /*  */

        let newAttachments = new Array();
        attachments.forEach((element) => {
            if(element['attach_id'] !== attach_id){
                newAttachments.push(element);
            }else{
                let formData = new FormData();
                formData.append('action', 'codosupport_remove_ticket_file');
                formData.append('nonce', codosupport_data.nonce);
                formData.append('attach_id', attach_id);
                dispatch(ticketActions.removeFile(formData)).then(res => {
                    if(res && res.type && res.type == 'success'){
                        setAttachments(newAttachments);
                    }
                });
            }
        });
    }

    const submitForm = (e) =>{
        e.preventDefault();
        setSubmitted(true);
        let tempItem = {
            title: title,
            product: product,
            description: description,
            attachments: attachments
        }
        if (tempItem.title && tempItem.description) {
            dispatch(ticketActions.addItem(tempItem)).then(res => {
                setSubmitted(false);
                if(res.type && res.type == 'success'){
                    setTitle('');
                    setDescription('');
                    setProduct('');
                    setAttachments([]);
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
                    <form method="POST" encType="multipart/form-data" id="codosupport-img-form">
                        <div className="upload-response"></div>
                        <div className="mb-2">
                            <label className="mr-2">Select Files:</label>
                            <input type="file" id="codosupport-files" className="codosupport-files" accept="image/*" multiple 
                            onChange={uploadFiles}/>
                        </div>
                    </form>
                    <div className="mb-2" id="codosupport-uploaded-files">
                        {attachments.length ?
                            (
                                attachments.map(item => {
                                    return (
                                        <div id={'codosupport-file-id-'+item['attach_id']} key={item['attach_id']}>
                                            <a href={item['url']} target="_blank">{item['name']}</a>
                                            <span className="ml-2">
                                                <a onClick={() => removeFile(item['attach_id'])} style={{color: 'red', cursor: 'pointer'}}>&#10006;</a>
                                            </span>
                                        </div>
                                    );
                                })
                            ): ''
                        }
                    </div>
                </div>

                <div className="mb-2">
                    <button className="btn btn-primary ml-auto rounded-0" disabled={loading} onClick={submitForm}>Save</button>
                    {loading &&
                        <Spinner showBlock={false}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default AddForm;