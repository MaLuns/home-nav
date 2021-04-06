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

    }
    if (['post', 'put'].includes(method)) {
        config.body = JSON.stringify(data)
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

const nav = {
    get: data => createAPI('/nav', 'get', data),
    create: data => createAPI('/nav', 'post', data),
    delete: data => createAPI('/nav', 'delete', data),
    update: data => createAPI('/nav', 'put', data),
}

const linkclass = {
    get: data => createAPI('/linkclass', 'get', data),
    create: data => createAPI('/linkclass', 'post', data),
    delete: data => createAPI('/linkclass', 'delete', data),
    update: data => createAPI('/linkclass', 'put', data),
}

const link = {
    get: data => createAPI('/link', 'get', data),
    create: data => createAPI('/link', 'post', data),
    delete: data => createAPI('/link', 'delete', data),
    update: data => createAPI('/link', 'put', data),
}
export {
    user,
    nav,
    link,
    linkclass,
}