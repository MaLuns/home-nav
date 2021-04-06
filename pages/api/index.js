const createAPI = (
    url,
    method,
    data = {},
    headers = {
        'content-type': 'application/json'
    }
) => {
    let config = {
        method,
        headers,
        body: JSON.stringify(data)
    }
    return fetch(
        '/api' + url,
        config
    ).then(res => {
        let data = res.json()
        if (data.success === false) {
            if (data.code === 10001) {
                body.data.forEach((date) => {
                    iView.Notice.error({
                        title: 'Error',
                        desc: date[Object.keys(date)[0]]
                    })
                })
            }
            return Promise.reject(data)
        } else {
            return data;
        }
    })
}


const user = {
    login: data => createAPI('/user/login', 'post', data),
    add: data => createAPI('/user/add', 'post', data)
}


export {
    user
}