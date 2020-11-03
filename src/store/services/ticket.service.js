export const ticketService = {
    getAll,
    getItemById,
    addItem,
    updateItem,
    deleteItem,
    uploadFiles,
    removeFile
};

function getAll(user_id = null, parent = 0) {
    return jQuery.ajax({
        type : "post",
        dataType : "json",
        url : codosupport_data.ajaxurl,
        data : {
            action: "codosupport_get_tickets", 
            nonce: codosupport_data.nonce,
            user_id: user_id,
            post_parent: parent
        }
    });
}

function getItemById(id) {
    return jQuery.ajax({
        type : "post",
        dataType : "json",
        url : codosupport_data.ajaxurl,
        data : {
            action: "codosupport_get_ticket_by_id", 
            nonce: codosupport_data.nonce,
            ticket_id: id
        }
    });
}

function addItem(item) {
    return jQuery.ajax({
        type : "post",
        dataType : "json",
        url : codosupport_data.ajaxurl,
        data : {
            action: "codosupport_add_new_ticket", 
            nonce: codosupport_data.nonce,
            title: item.title,
            product: item.product,
            description: item.description,
            attachments: item.attachments,
            parent: item.parent,
            user_id: codosupport_data.user_id,
            type: item.type
        }
    });
}

function uploadFiles(files) {
    return jQuery.ajax({
        type : "POST",
        processData: false,
        contentType: false,
        dataType: "JSON",
        url : codosupport_data.ajaxurl,
        data : files
    });
}

function removeFile(formData) {
    return jQuery.ajax({
        type : "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        url : codosupport_data.ajaxurl,
        data : formData
    });
}

function updateItem(id, item) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(item),
        headers: authHeader()
    };

    return fetch(`${vars.apiURL}todolists/${id}`, requestOptions).then(handleResponse);
}

function deleteItem(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${vars.apiURL}todolists/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}