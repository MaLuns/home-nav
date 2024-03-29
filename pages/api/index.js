import iView from 'view-design';

iView.LoadingBar.config({
    height: 3
});

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
        credentials: 'same-origin'
    }
    iView.LoadingBar.start();
    if (['post', 'put', 'delete'].includes(method)) {
        config.body = JSON.stringify(data)
    } else {
        let str = ''
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                str += `${key}=${element}&`
            }
        }
        if (str.length > 0) url += "?" + str
    }

    return fetch('/api' + url, config)
        .then(res => res.json())
        .then(data => {
            iView.LoadingBar.finish();
            if (data.success === false) {
                if (data.code === 10001) {
                    data.data.forEach((item) => {
                        iView.Notice.error({
                            title: '参数异常',
                            desc: item[Object.keys(item)[0]]
                        })
                    })
                } else if (data.code === 401) {
                    location.href = '/admin'
                } else if (data.code === -1) {
                    iView.Notice.error({
                        title: '结果',
                        desc: data.message
                    })
                }
                return Promise.reject(data)
            } else {
                return data;
            }
        }).catch(() => {
            iView.LoadingBar.error();
        })
}


const user = {
    login: data => createAPI('/user/login', 'post', data),
    add: data => createAPI('/user/add', 'post', data)
}

const nav = {
    get: data => createAPI('/nav', 'get', data),
    create: data => createAPI('/nav', 'post', data),
    delete: id => createAPI('/nav/' + id, 'delete'),
    update: data => createAPI('/nav', 'put', data),
}

const linkclass = {
    get: data => createAPI('/linkclass', 'get', data),
    create: data => createAPI('/linkclass', 'post', data),
    delete: id => createAPI('/linkclass/' + id, 'delete'),
    update: data => createAPI('/linkclass', 'put', data),
    childen: data => createAPI('/linkclass/childen', 'get', data),
}

const link = {
    get: data => createAPI('/link', 'get', data),
    create: data => createAPI('/link', 'post', data),
    delete: id => createAPI('/link/' + id, 'delete'),
    update: data => createAPI('/link', 'put', data),
}

const count = {
    update: data => createAPI('/count', 'put', data)
}

export {
    user,
    nav,
    link,
    linkclass,
    count
}