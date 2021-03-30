import Vue from 'vue'
const baseurl = true ? 'http://localhost:3000' : ''

Vue.prototype.$mock = (url) => {
    return fetch(baseurl + url).then(res => res.json());
}
