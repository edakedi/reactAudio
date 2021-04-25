export const postHeaders = {
    "Content-Type": "application/json"
};

export const deleteHeaders = {
    "Content-Type": "application/json"
};

export const getHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/pdf"
};


export const getRequest = function getRequest(url, successFunc, headers = false, extra_data = false) {
    if (!headers) {
        headers = postHeaders;
    }

    return fetch(url, {
        headers,
        method: "GET"
    })
        .then((response) => {
            if (response.status === 200 || response.status === 400) {
                return response.json().then(data => {
                    if (!extra_data) {
                        return successFunc(data);
                    } else {
                        return successFunc(data, extra_data);
                    }
                })
            }
            if (response.status === 401 || response.status === 403) {
                return response.json().then(data => {
                    if (!extra_data) {
                        return successFunc(data);
                    } else {
                        return successFunc(data, extra_data);
                    }
                })
            }
            if (response.status >= 500) {
                throw Error("Internal Server Error");
            }
        }).catch((err) => {
            console.log(err);
        });
};


export const postRequest = function postRequest(url, body, successFunc, method = "POST",
    headers = false, extra_data = false) {
    if (!headers) {
        headers = postHeaders;
    }

    return fetch(url, {
        headers,
        body,
        method: method
    })
        .then((response) => {
            if ([200, 201, 400, 404, 422].includes(response.status)) {
                return response.json().then(data => {
                    if (!extra_data) {
                        return successFunc(data);
                    } else {
                        return successFunc(data, extra_data);
                    }
                })
            }
            if (response.status === 401 || response.status === 403) {
                return response.json().then(data => {
                    if (!extra_data) {
                        return successFunc(data);
                    } else {
                        return successFunc(data, extra_data);
                    }
                })
            }
            if (response.status >= 500) {
                throw Error("Internal Server Error");
            }
        }).catch((err) => {
            // setState({ "server_error": true })
            console.log(err)
        });
};

export const deleteRequest = function deleteRequest(url, successFunc, headers = false, extra_data = false) {
    if (!headers) {
        headers = deleteHeaders;
    }
    return fetch(url, {
        headers,
        method: "DELETE"
    })
        .then((response) => {
            if (response.status === 200 || response.status === 201 || response.status === 400) {
                return response.json().then(data => {
                    if (!extra_data) {
                        return successFunc(data);
                    } else {
                        return successFunc(data, extra_data);
                    }
                })
            }
            if (response.status === 401 || response.status === 403) {
                window.location = getLoginURL();
            }
            if (response.status >= 500) {
                throw Error("Internal Server Error");
            }
        }).catch((err) => {
            console.log(err);
        });
};