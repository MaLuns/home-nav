import Vue from 'vue'

Vue.prototype.$mock = (url, config = {}) => {
    return fetch(process.env.baseURL + url, config).then(res => res.json());
}
