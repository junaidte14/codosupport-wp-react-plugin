import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ticketActions, alertActions } from '../../store/actions';
import Spinner from '../spinner';

const AddForm = (props) =>{
    const {type, parent, setSelectedItem, setTicketView, setHistoryView} = props;
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
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
            case 'category':
                setCategory(value);
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
        let files_data = jQuery('.codosupport-files')[0].files;
        let imgForm = jQuery('#codosupport-img-form')[0];
        let formData = new FormData(imgForm);
        for(let i=0; i<files_data.length; i++) {
            formData.append('files[]', files_data[i]);
        }
        formData.append('action', 'codosupport_upload_files');
        formData.append('nonce', codosupport_data.nonce);
        dispatch(ticketActions.uploadFiles(formData)).then(res => {
            jQuery('.codosupport-files').val('');
            if(res.data && res.data.length){
                setAttachments(res.data);
            }
        });
    }

    const removeFile = (attach_id) => {
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
            category: category,
            description: description,
            attachments: attachments,
            parent: parent,
            type: type
        }
        if ((tempItem.title || type == 'history') && tempItem.description) {
            dispatch(ticketActions.addItem(tempItem)).then(res => {
                setSubmitted(false);
                if(res.type && res.type == 'success'){
                    setTitle('');
                    setDescription('');
                    setCategory('');
                    setAttachments([]);
                    if(type == 'ticket'){
                        setSelectedItem(res.post_id);
                        setTicketView('viewTickets');
                    }else{
                        setHistoryView('viewHistory');
                    }
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
        <div className="codosupport-add-form">
            <h2 style={{color: codosupport_data.theme_bg_color}}>{(type == 'ticket') ? 'Add Support Ticket': 'Add Ticket History'}</h2>
            {
                (type === 'ticket') &&
                <>
                    <div className="codo-form-field-wrapper">
                        <input type="text" className={'codo-form-field codo-full-width'} name="title" placeholder="Title" value={title} onChange={handleChange}/>
                        {submitted && !title &&
                            <div className="codo-error">Title is required</div>
                        }
                    </div>
                    <div className="codo-form-field-wrapper">
                        <select value={category} name="category" className="codo-form-field codo-full-width" onChange={handleChange}> 
                            <option value="">Select Category</option>
                            {codosupport_data.support_categories && codosupport_data.support_categories.length !== 0 &&
                                Object.keys(codosupport_data.support_categories).map((item) => {
                                    return (
                                    <option 
                                        value={codosupport_data.support_categories[item].term_id} 
                                        key={codosupport_data.support_categories[item].term_id}>
                                        {codosupport_data.support_categories[item].name}
                                    </option>)
                                })
                            }
                        </select>
                    </div>
                </>
            }

            <div className="codo-form-field-wrapper">
                <textarea className={'codo-form-field codo-full-width'} name="description" placeholder="Please provide as much details as you can e.g. website URL, transaction ID (if applicable), etc." value={description} onChange={handleChange}></textarea>
                {submitted && !description &&
                    <div className="codo-error">Description is required</div>
                }
            </div>

            <div className="codo-form-field-wrapper">
                <form method="POST" encType="multipart/form-data" id="codosupport-img-form">
                    <div className="upload-response"></div>
                    <div className="codo-form-field-wrapper">
                        <label className="mr-2">Select Files:</label>
                        <input type="file" id="codosupport-files" className="codosupport-files" accept="image/*" multiple 
                        onChange={uploadFiles}/>
                    </div>
                </form>
                <div className="codo-form-field-wrapper" id="codosupport-uploaded-files">
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

            <div className="codo-form-field-wrapper">
                <button className="codosupport-button button" 
                style={{
                    backgroundColor: codosupport_data.theme_bg_color,
                    borderColor: codosupport_data.theme_bg_color,
                    color: codosupport_data.theme_color
                }}
                disabled={loading} onClick={submitForm}>Save</button>
                {loading &&
                    <Spinner showBlock={false}/>
                }
            </div>
        </div>
    );
}

export default AddForm;