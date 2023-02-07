export const state = () => ({
    nav: [],
    linkclass: {}
})

export const getters = {
    getNav(state) {
        return state.nav
    },
    getLinkclass(state) {
        return state.linkclass
    }
}


export const mutations = {
    addNav(state, list = []) {
        state.nav = list
    },

    addNavClass(state, { id, list }) {
        if (Object.hasOwnProperty.call(state.linkclass, id)) {
            state.linkclass[id] = list
        } else {
            state.linkclass[id] = list
        }
    }
}