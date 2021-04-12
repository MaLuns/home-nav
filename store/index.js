export default {
    state: {
        user: null
    },
    actions: {
        nuxtServerInit({ commit, state }, { req }) {
            //let cookie = req.headers.cookie;
            /* console.log(req) */
            //commit('setToken', cookie);
            console.log(state)
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    }
}