import Vue from 'vue'

Vue.prototype.$mock = (url) => {
    return fetch(process.env.baseURL + url).then(res => res.json());
}
