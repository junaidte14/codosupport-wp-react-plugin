export const ticketService = {
    getAll,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};

function getAll() {
    return jQuery.ajax({
        type : "post",
        dataType : "json",
        url : codosupport_data.ajaxurl,
        data : {
            action: "codosupport_get_tickets_data", 
            nonce: codosupport_data.nonce
        }
    });
}

function getItemById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${vars.apiURL}todolists/${id}`, requestOptions).then(handleResponse);
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
            description: item.description
        }
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